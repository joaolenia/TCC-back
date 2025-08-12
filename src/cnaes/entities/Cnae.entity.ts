import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cnaes')
export class Cnaes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;
}
