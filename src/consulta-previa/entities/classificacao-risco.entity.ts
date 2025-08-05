import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PerguntaClassificacaoRisco } from "./pergunta-classificacao-risco.entity";

@Entity()
export class ClassificacaoRisco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  ds_tipo_risco: string;

  @OneToMany(() => PerguntaClassificacaoRisco, p => p.classificacaoRisco, { cascade: true })
  pergunta_classificacao_risco: PerguntaClassificacaoRisco[];
}
