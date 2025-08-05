import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";

@Entity()
export class Pergunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  co_pergunta: number;

  @Column({ length: 2000 })
  ds_pergunta: string;

  @Column({ length: 5000 })
  ds_resposta: string;

  @ManyToOne(() => ConsultaPrevia, c => c.questionario)
  consultaPrevia: ConsultaPrevia;
}
