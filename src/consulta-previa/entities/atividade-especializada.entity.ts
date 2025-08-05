import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Atividade } from "./atividade.entity";

@Entity()
export class AtividadeEspecializada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 17 })
  co_cnae_especializada: string;

  @Column()
  is_atividade_principal: boolean;

  @Column()
  is_exerce_no_endereco: boolean;

  @ManyToOne(() => Atividade, a => a.atividades_especializadas)
  atividade: Atividade;
}
