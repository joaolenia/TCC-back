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
    // Injete o DataSource para gerenciar a transação
    private dataSource: DataSource,
    @InjectRepository(ConsultaPrevia)
    private readonly consultaPreviaRepository: Repository<ConsultaPrevia>,
  ) {}

  async create(
    createConsultaPreviaDto: CreateConsultaPreviaDto,
  ): Promise<ConsultaPrevia> {
    const { dados_consulta_previa } = createConsultaPreviaDto;

    // Inicia a transação
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      // O método .create() do repositório apenas cria a instância do objeto,
      // ele não acessa o banco de dados. Isso é seguro de se fazer aqui.
      const novaConsulta = this.consultaPreviaRepository.create({
        ...dados_consulta_previa,
        id_sigFacil:dados_consulta_previa.id,
        solicitante: dados_consulta_previa.solicitante as Solicitante,
        endereco: dados_consulta_previa.endereco as Endereco,
        utilizacao_solo: dados_consulta_previa.utilizacao_solo as UtilizacaoSolo,
        classificacao_risco: dados_consulta_previa.classificacao_risco as ClassificacaoRisco,
        
        opcoes_nome: dados_consulta_previa.opcoes_nome as OpcaoNome[],
        atividades: dados_consulta_previa.atividades as Atividade[],
        eventos: dados_consulta_previa.eventos as EventoRedesim[],
        socios: dados_consulta_previa.socios as Socio[],
        tipo_unidade: dados_consulta_previa.tipo_unidade as TipoUnidade[],
        formas_atuacao: dados_consulta_previa.formas_atuacao as FormaAtuacao[],
        questionario: dados_consulta_previa.questionario as Pergunta[],
      });

      // Salva a entidade principal e todas as suas cascatas DENTRO da transação,
      // usando o entityManager da transação.
      // Se qualquer erro ocorrer aqui, o TypeORM fará o rollback automaticamente.
      return transactionalEntityManager.save(novaConsulta);
    });
  }
}