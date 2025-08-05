import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";

@Entity()
export class FormaAtuacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  co_forma_atuacao: number;

  @ManyToOne(() => ConsultaPrevia, c => c.formas_atuacao)
  consultaPrevia: ConsultaPrevia;
}
