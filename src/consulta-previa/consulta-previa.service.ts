import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateConsultaPreviaDto } from './dtos/create-consulta-previa.dto';
import { ConsultaPrevia, SituacaoConsulta } from './entities/consulta-previa.entity';
import { Solicitante } from './entities/solicitante.entity';
import { Endereco } from './entities/endereco.entity';
import { OpcaoNome } from './entities/opcao-nome.entity';
import { Atividade } from './entities/atividade.entity';
import { EventoRedesim } from './entities/evento-redesim.entity';
import { Socio } from './entities/socio.entity';
import { TipoUnidade } from './entities/tipo-unidade.entity';
import { FormaAtuacao } from './entities/forma-atuacao.entity';
import { UtilizacaoSolo } from './entities/utilizacao-solo.entity';
import { Pergunta } from './entities/pergunta.entity';
import { ClassificacaoRisco } from './entities/classificacao-risco.entity';
import { ZoneamentoService } from 'src/zoneamento/zoneamento.service';
import { ConsultaPreviaResponseDto, SituacaoConsultaResponse } from './dtos/Response.dto';

@Injectable()
export class ConsultaPreviaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ConsultaPrevia)
    private readonly consultaPreviaRepository: Repository<ConsultaPrevia>,
    private readonly zoneamentoService: ZoneamentoService,
  ) {}

  async create(
    createConsultaPreviaDto: CreateConsultaPreviaDto,
  ): Promise<ConsultaPreviaResponseDto> {
    const { id: idSigFacil, ...dados } = createConsultaPreviaDto.dados_consulta_previa;

    const saved = await this.dataSource.transaction(async (transactionalEntityManager) => {
      const novaConsulta = this.consultaPreviaRepository.create({
        ...dados,
        id_sigFacil: idSigFacil,
        solicitante: dados.solicitante as Solicitante,
        endereco: dados.endereco as Endereco,
        utilizacao_solo: dados.utilizacao_solo as UtilizacaoSolo,
        classificacao_risco: dados.classificacao_risco as ClassificacaoRisco,
        opcoes_nome: dados.opcoes_nome as OpcaoNome[],
        atividades: dados.atividades as Atividade[],
        eventos: dados.eventos as EventoRedesim[],
        socios: dados.socios as Socio[],
        tipo_unidade: dados.tipo_unidade as TipoUnidade[],
        formas_atuacao: dados.formas_atuacao as FormaAtuacao[],
        questionario: dados.questionario as Pergunta[],
      });

      const savedConsulta = await transactionalEntityManager.save(novaConsulta);

      await this.assignZoneamento(savedConsulta);

      return savedConsulta;
    });

    return this.mapToResponse(saved);
  }

   async findAllResumo(): Promise<any[]> {
    const consultas = await this.consultaPreviaRepository.find({
      relations: ['solicitante', 'endereco', 'atividades'],
    });

    return consultas.map((c) => {
      const enderecoResumido = c.endereco
        ? `${c.endereco.ds_bairro}, ${c.endereco.ds_endereco}, ${c.endereco.nu_numero}`
        : '';

      const cnaes = c.atividades?.map((a) => a.co_cnae) || [];

      return {
        id: c.id,
        situacao:c.situacao,
        co_protocolo_redesim: c.co_protocolo_redesim,
        nome_solicitante: c.solicitante?.ds_nome || '',
        endereco: enderecoResumido,
        dt_solicitacao: c.dt_solicitacao,
        cnaes,
      };
    });
  }

  private async assignZoneamento(consulta: ConsultaPrevia) {
    const lat = parseFloat(consulta.endereco?.coordenadas_geograficas?.nu_latitude);
    const lon = parseFloat(consulta.endereco?.coordenadas_geograficas?.nu_longitude);

    if (!isNaN(lat) && !isNaN(lon)) {
      const zona = await this.zoneamentoService.findZoneByCoordinate(lon, lat);

      if (!zona) {
        consulta.situacao = SituacaoConsulta.INDEFERIDO;
        consulta.observacoes = 'Coordenadas geográficas inválidas ou fora de qualquer zona.';
        await this.consultaPreviaRepository.save(consulta);
        return;
      }

      consulta.zoneamento = zona;
      await this.consultaPreviaRepository.save(consulta);

      await this.validateAtividadesNaZona(consulta);
    } else {
      consulta.situacao = SituacaoConsulta.INDEFERIDO;
      consulta.observacoes = 'Coordenadas geográficas ausentes ou inválidas.';
      await this.consultaPreviaRepository.save(consulta);
    }
  }

  private async validateAtividadesNaZona(consulta: ConsultaPrevia) {
    if (!consulta.zoneamento) {
      consulta.situacao = SituacaoConsulta.INDEFERIDO;
      consulta.observacoes = 'Zona não atribuída para a consulta.';
      await this.consultaPreviaRepository.save(consulta);
      return;
    }

    const cnaesPermitidos = consulta.zoneamento.cnaesPermitidos.map((c) => c.codigo);
    const cnaesInvalidos: string[] = [];

    for (const atividade of consulta.atividades || []) {
      if (!atividade.is_exerce_no_endereco) continue;

      if (!cnaesPermitidos.includes(atividade.co_cnae)) {
        cnaesInvalidos.push(atividade.co_cnae);
      }

      if (atividade.atividades_especializadas) {
        for (const especial of atividade.atividades_especializadas) {
          if (especial.is_exerce_no_endereco && !cnaesPermitidos.includes(especial.co_cnae_especializada)) {
            cnaesInvalidos.push(especial.co_cnae_especializada);
          }
        }
      }
    }

    if (cnaesInvalidos.length > 0) {
      consulta.situacao = SituacaoConsulta.INDEFERIDO;
      consulta.observacoes = `As seguintes atividades não são permitidas nesta zona: ${cnaesInvalidos.join(
        ', ',
      )}`;
    } else {
      consulta.situacao = SituacaoConsulta.DEFERIDO;
      consulta.observacoes = '';
    }

    await this.consultaPreviaRepository.save(consulta);
  }

  private mapToResponse(consulta: ConsultaPrevia): ConsultaPreviaResponseDto {
    const response = new ConsultaPreviaResponseDto();

    response.controle = {
      nu_identificador_orgao: 99, 
      ds_orgao: 'Junta Comercial do Estado Exemplo',
    };

    response.dados_resposta_consulta_previa = {
      co_protocolo_redesim: consulta.co_protocolo_redesim,
      dt_evento: new Date().toISOString().replace('T', ' ').substring(0, 19),
      co_tipo_consulta: 2, 
      co_situacao_consulta:
        consulta.situacao === SituacaoConsulta.DEFERIDO
          ? SituacaoConsultaResponse.DEFERIDO
          : SituacaoConsultaResponse.INDEFERIDO,
      ds_observacao: consulta.observacoes,
      ds_classificacao_risco: consulta.classificacao_risco?.ds_tipo_risco,  
    };

    return response;
  }

}
