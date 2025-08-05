import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class NaturezaImovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1 })
  co_tipo_natureza: string;

  @Column({ length: 30 })
  nu_inscricao: string;
}
