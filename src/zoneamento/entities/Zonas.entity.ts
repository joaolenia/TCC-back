import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Cnaes } from 'src/cnaes/entities/Cnae.entity';

@Entity('zoneamentos')
export class Zoneamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @ManyToMany(() => Cnaes, { eager: true })
  @JoinTable({
    name: 'zoneamento_cnaes',
    joinColumn: { name: 'zoneamento_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cnae_id', referencedColumnName: 'id' },
  })
  cnaesPermitidos: Cnaes[];
}
