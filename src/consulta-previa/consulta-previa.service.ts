import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateConsultaPreviaDto } from './dto/create-consulta-previa.dto';
import { ConsultaPrevia } from './entities/consulta-previa.entity';
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

@Injectable()
export class ConsultaPreviaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ConsultaPrevia)
    private readonly consultaPreviaRepository: Repository<ConsultaPrevia>,
  ) {}

  async create(
    createConsultaPreviaDto: CreateConsultaPreviaDto,
  ): Promise<ConsultaPrevia> {
    // Extrai o 'id' e o resto dos dados do DTO
    const { id: idSigFacil, ...dados } = createConsultaPreviaDto.dados_consulta_previa;

    return this.dataSource.transaction(async (transactionalEntityManager) => {
      // Cria a entidade com todos os dados, exceto o 'id' do DTO
      const novaConsulta = this.consultaPreviaRepository.create({
        ...dados,
        // Atribui explicitamente o id do DTO para o campo id_sigFacil
        id_sigFacil: idSigFacil,

        // Mapeia os DTOs aninhados para as entidades correspondentes
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

      // Salva a nova entidade dentro da transação
      return transactionalEntityManager.save(novaConsulta);
    });
  }
}