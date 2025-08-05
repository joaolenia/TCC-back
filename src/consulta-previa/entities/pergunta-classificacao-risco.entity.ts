import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClassificacaoRisco } from "./classificacao-risco.entity";

@Entity()
export class PerguntaClassificacaoRisco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  co_identificador_pergunta: string;

  @Column({ length: 2000 })
  ds_pergunta: string;

  @Column({ length: 5000 })
  ds_resposta: string;

  @ManyToOne(() => ClassificacaoRisco, c => c.pergunta_classificacao_risco)
  classificacaoRisco: ClassificacaoRisco;
}
