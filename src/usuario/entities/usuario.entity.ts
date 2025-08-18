import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export type UserRole = 'ADMIN' | 'PADRAO';

@Entity('usuarios')
@Unique(['email'])
@Unique(['cpf'])
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 14 })
  cpf: string;

  @Column()
  senha: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'PADRAO'],
    default: 'PADRAO',
  })
  role: UserRole;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
