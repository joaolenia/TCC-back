import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 11 })
  nu_cpf: string;

  @Column({ length: 200 })
  ds_nome: string;

  @Column()
  is_contador: boolean;

  @Column({ length: 2, nullable: true })
  nu_ddd_telefone: string;

  @Column({ length: 10, nullable: true })
  nu_telefone: string;

  @Column({ length: 4, nullable: true })
  nu_ramal: string;

  @Column({ length: 150, nullable: true })
  ds_email: string;
}
