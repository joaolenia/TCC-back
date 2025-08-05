
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";
@Entity()
export class EventoRedesim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  co_evento: number;

  @ManyToOne(() => ConsultaPrevia, c => c.eventos)
  consultaPrevia: ConsultaPrevia;
}
