import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitante } from "./solicitante.entity";
import { OpcaoNome } from "./opcao-nome.entity";
import { Atividade } from "./atividade.entity";
import { EventoRedesim } from "./evento-redesim.entity";
import { Socio } from "./socio.entity";
import { Endereco } from "./endereco.entity";
import { TipoUnidade } from "./tipo-unidade.entity";
import { FormaAtuacao } from "./forma-atuacao.entity";
import { UtilizacaoSolo } from "./utilizacao-solo.entity";
import { Pergunta } from "./pergunta.entity";
import { ClassificacaoRisco } from "./classificacao-risco.entity";

@Entity()
export class ConsultaPrevia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_sigFacil:number;

  @Column({ length: 13 })
  co_protocolo_redesim: string;

  @Column()
  dt_solicitacao: Date;

  @Column({ length: 14, nullable: true })
  nu_cnpj: string;

  @Column({ length: 14, nullable: true })
  nu_cnpj_matriz: string;

  @Column()
  is_atualizacao_receita: boolean;

  @Column({ length: 14000 })
  ds_objeto_social: string;

  @Column({ length: 5 })
  co_natureza_juridica: string;

  @Column()
  co_enquadramento: number;

  @Column({ length: 14, nullable: true })
  nu_cnpj_entidade_registro: string;

  @Column({ length: 14, nullable: true })
  nu_cnpj_entidade_registro_matriz: string;

  @Column({ length: 30, nullable: true })
  co_inscricao_municipal: string;

  @OneToOne(() => Solicitante, { cascade: true, eager: true })
  @JoinColumn()
  solicitante: Solicitante;

  @OneToMany(() => OpcaoNome, o => o.consultaPrevia, { cascade: true })
  opcoes_nome: OpcaoNome[];

  @OneToMany(() => Atividade, a => a.consultaPrevia, { cascade: true })
  atividades: Atividade[];

  @OneToMany(() => EventoRedesim, e => e.consultaPrevia, { cascade: true })
  eventos: EventoRedesim[];

  @OneToMany(() => Socio, s => s.consultaPrevia, { cascade: true })
  socios: Socio[];

  @OneToOne(() => Endereco, { cascade: true, eager: true })
  @JoinColumn()
  endereco: Endereco;

  @OneToMany(() => TipoUnidade, t => t.consultaPrevia, { cascade: true })
  tipo_unidade: TipoUnidade[];

  @OneToMany(() => FormaAtuacao, f => f.consultaPrevia, { cascade: true })
  formas_atuacao: FormaAtuacao[];

  @OneToOne(() => UtilizacaoSolo, { cascade: true, eager: true })
  @JoinColumn()
  utilizacao_solo: UtilizacaoSolo;

  @OneToMany(() => Pergunta, p => p.consultaPrevia, { cascade: true })
  questionario: Pergunta[];

  @OneToOne(() => ClassificacaoRisco, { cascade: true, eager: true })
  @JoinColumn()
  classificacao_risco: ClassificacaoRisco;
}
