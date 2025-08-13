import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { Cnaes } from 'src/cnaes/entities/Cnae.entity';

@Entity('zoneamentos')
export class Zoneamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @ManyToMany(() => Cnaes, { eager: true })
  @JoinTable({
    name: 'zoneamento_cnaes',
    joinColumn: { name: 'zoneamento_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cnae_id', referencedColumnName: 'id' },
  })
  cnaesPermitidos: Cnaes[];

  // Coluna para o polígono da zona
@Column({
  type: 'geometry',
  spatialFeatureType: 'Polygon',
  srid: 4326,
  nullable: true, // permite que seja nula
})
area: any;

}
