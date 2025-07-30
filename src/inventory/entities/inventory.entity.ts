import { Users } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inventories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ownerName: string;

  @Column()
  spptNumber: string;

  @Column()
  certificateNumber: string;

  @Column('numeric', { precision: 9, scale: 6 })
  latitude: number;

  @Column('numeric', { precision: 9, scale: 6 })
  longitude: number;

  @Column('numeric')
  sizeArea: number;

  @Column('numeric')
  landPrice: number;

  @Column('numeric')
  njopPrice: number;

  @Column('numeric')
  zonePrice: number;

  @Column('text', { array: true, nullable: false })
  imageURLs: string[];

  @ManyToOne(() => Users, (user) => user.inventories, { nullable: false })
  user: Users;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
