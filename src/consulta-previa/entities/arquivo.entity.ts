import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UtilizacaoSolo } from "./utilizacao-solo.entity";

 @Entity()
export class Arquivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ds_url_servico: string;

  @ManyToOne(() => UtilizacaoSolo, u => u.ds_arquivo)
  utilizacao_solo: UtilizacaoSolo;
}
