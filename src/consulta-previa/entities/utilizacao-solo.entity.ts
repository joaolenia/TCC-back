import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arquivo } from "./arquivo.entity";

@Entity()
export class UtilizacaoSolo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  co_utilizacao_solo: number;

  @Column({ length: 40 })
  nu_autorizacao: string;

  @OneToMany(() => Arquivo, a => a.utilizacao_solo, { cascade: true })
  ds_arquivo: Arquivo[];
}
