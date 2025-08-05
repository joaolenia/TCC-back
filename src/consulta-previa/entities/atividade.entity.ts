import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConsultaPrevia } from "./consulta-previa.entity";
import { AtividadeEspecializada } from "./atividade-especializada.entity";

@Entity()
export class Atividade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  co_cnae: string;

  @Column()
  is_atividade_principal: boolean;

  @Column({ nullable: true })
  is_exerce_no_endereco: boolean;

  @ManyToOne(() => ConsultaPrevia, c => c.atividades)
  consultaPrevia: ConsultaPrevia;

  @OneToMany(() => AtividadeEspecializada, a => a.atividade, { cascade: true })
  atividades_especializadas: AtividadeEspecializada[];
}
