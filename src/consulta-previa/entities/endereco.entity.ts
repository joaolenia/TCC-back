
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NaturezaImovel } from "./natureza-imovel.entity";
import { Point } from "./point.entity";
@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  co_uf: number;

  @Column({ length: 8 })
  co_cep: string;

  @Column({ nullable: true })
  co_tipo_imovel: number;

  @Column()
  co_tipo_logradouro: number;

  @Column({ length: 100 })
  ds_tipo_logradouro: string;

  @Column({ length: 100 })
  ds_endereco: string;

  @Column({ length: 7 })
  nu_numero: string;

  @Column({ length: 50 })
  ds_bairro: string;

  @Column({ length: 162, nullable: true })
  ds_complemento: string;

  @Column()
  co_municipio: number;

  @Column()
  co_municipio_tom: number;

  @Column({ length: 15, nullable: true })
  nu_area_total: string;

  @Column({ length: 15, nullable: true })
  nu_area_utilizada: string;

  @Column({ length: 150, nullable: true })
  ds_ponto_referencia: string;

  @OneToOne(() => NaturezaImovel, { cascade: true, eager: true })
  @JoinColumn()
  natureza_imovel: NaturezaImovel;

  @OneToOne(() => Point, { cascade: true, eager: true })
  @JoinColumn()
  coordenadas_geograficas: Point;
}
