import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";

@Entity()
export class OpcaoNome {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  ds_opcao_nome: string;

  @ManyToOne(() => ConsultaPrevia, c => c.opcoes_nome)
  consultaPrevia: ConsultaPrevia;
}
