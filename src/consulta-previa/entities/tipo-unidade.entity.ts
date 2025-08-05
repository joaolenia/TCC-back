import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";

@Entity()
export class TipoUnidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  co_tipo_unidade: number;

  @ManyToOne(() => ConsultaPrevia, c => c.tipo_unidade)
  consultaPrevia: ConsultaPrevia;
}
