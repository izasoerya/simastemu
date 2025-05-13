import { Users } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Inventories {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @Column('numeric', { precision: 9, scale: 6 })
  latitude: number;

  @Column('numeric', { precision: 9, scale: 6 })
  longitude: number;

  @Column('text', { array: true })
  imageURLs: string[];

  @ManyToOne(() => Users, (user) => user.inventories, { nullable: false })
  user: Users;

  @CreateDateColumn()
  createdAt: Timestamp;

  @Column('timestamptz', { nullable: true })
  updatedAt: Timestamp;
}
