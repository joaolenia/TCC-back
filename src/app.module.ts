import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaPrevia } from './consulta-previa/entities/consulta-previa.entity';
import { Arquivo } from './consulta-previa/entities/arquivo.entity';
import { AtividadeEspecializada } from './consulta-previa/entities/atividade-especializada.entity';
import { Atividade } from './consulta-previa/entities/atividade.entity';
import { ClassificacaoRisco } from './consulta-previa/entities/classificacao-risco.entity';
import { Endereco } from './consulta-previa/entities/endereco.entity';
import { EventoRedesim } from './consulta-previa/entities/evento-redesim.entity';
import { FormaAtuacao } from './consulta-previa/entities/forma-atuacao.entity';
import { NaturezaImovel } from './consulta-previa/entities/natureza-imovel.entity';
import { OpcaoNome } from './consulta-previa/entities/opcao-nome.entity';
import { PerguntaClassificacaoRisco } from './consulta-previa/entities/pergunta-classificacao-risco.entity';
import { Pergunta } from './consulta-previa/entities/pergunta.entity';
import { Point } from './consulta-previa/entities/point.entity';
import { Socio } from './consulta-previa/entities/socio.entity';
import { Solicitante } from './consulta-previa/entities/solicitante.entity';
import { TipoUnidade } from './consulta-previa/entities/tipo-unidade.entity';
import { UtilizacaoSolo } from './consulta-previa/entities/utilizacao-solo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou 'postgres'
      host: 'localhost',
      port: 3306, // postgres: 5432
      username: 'root',
      password: '1234567',
      database: 'consulta_previa_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // cuidado: true só no desenvolvimento!
    }),
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
      UtilizacaoSolo
      
    ]),
  ],
})
export class AppModule {}
