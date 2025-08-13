import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaPreviaService } from './consulta-previa.service';
import { ConsultaPreviaController } from './consulta-previa.controller';
import { ConsultaPrevia } from './entities/consulta-previa.entity';
import { Arquivo } from './entities/arquivo.entity';
import { AtividadeEspecializada } from './entities/atividade-especializada.entity';
import { Atividade } from './entities/atividade.entity';
import { ClassificacaoRisco } from './entities/classificacao-risco.entity';
import { Endereco } from './entities/endereco.entity';
import { EventoRedesim } from './entities/evento-redesim.entity';
import { FormaAtuacao } from './entities/forma-atuacao.entity';
import { NaturezaImovel } from './entities/natureza-imovel.entity';
import { OpcaoNome } from './entities/opcao-nome.entity';
import { PerguntaClassificacaoRisco } from './entities/pergunta-classificacao-risco.entity';
import { Pergunta } from './entities/pergunta.entity';
import { Point } from './entities/point.entity';
import { Socio } from './entities/socio.entity';
import { Solicitante } from './entities/solicitante.entity';
import { TipoUnidade } from './entities/tipo-unidade.entity';
import { UtilizacaoSolo } from './entities/utilizacao-solo.entity';
import { ZoneamentoModule } from 'src/zoneamento/zoneamento.module'; // importa o módulo

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultaPrevia,
      Arquivo,
      AtividadeEspecializada,
      Atividade,
      ClassificacaoRisco,
      Endereco,
      EventoRedesim,
      FormaAtuacao,
      NaturezaImovel,
      OpcaoNome,
      PerguntaClassificacaoRisco,
      Pergunta,
      Point,
      Socio,
      Solicitante,
      TipoUnidade,
      UtilizacaoSolo,
    ]),
    ZoneamentoModule, 
  ],
  controllers: [ConsultaPreviaController],
  providers: [ConsultaPreviaService],
})
export class ConsultaPreviaModule {}
