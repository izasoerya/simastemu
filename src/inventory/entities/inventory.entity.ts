import { Users } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inventories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', { precision: 9, scale: 6 })
  latitude: number;

  @Column('numeric', { precision: 9, scale: 6 })
  longitude: number;

  @Column('text', { array: true, nullable: false })
  imageURLs: string[];

  @ManyToOne(() => Users, (user) => user.inventories, { nullable: false })
  user: Users;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
