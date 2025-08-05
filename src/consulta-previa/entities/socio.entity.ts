import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";
@Entity()
export class Socio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  ds_nome: string;

  @Column({ length: 14 })
  nu_cpf_cnpj: string;

  @Column({ length: 150, nullable: true })
  ds_nome_mae: string;

  @ManyToOne(() => ConsultaPrevia, c => c.socios)
  consultaPrevia: ConsultaPrevia;
}
