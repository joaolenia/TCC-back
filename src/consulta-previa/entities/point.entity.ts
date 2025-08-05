import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  nu_latitude: string;

  @Column({ length: 20 })
  nu_longitude: string;
}
