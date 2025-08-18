import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Cnaes } from 'src/cnaes/entities/Cnae.entity';
import { Exclude } from 'class-transformer';

@Entity('zoneamentos')
export class Zoneamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: false })
  nome: string;

  @Column({ type: 'varchar', nullable: true })
  descricao?: string;

  @ManyToMany(() => Cnaes, { eager: true })
  @JoinTable()
  cnaesPermitidos: Cnaes[];

  // Campo GeoJSON
  @Exclude() // <-- Isso impede que apareça no JSON
  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
  area?: object;
}
