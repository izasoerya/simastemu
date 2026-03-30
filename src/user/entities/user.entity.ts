import { Inventories } from '../../inventory/entities/inventory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  hashedPassword: string;

  @Column('boolean', { default: false })
  isActivated: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(() => Inventories, (inventory) => inventory.owner)
  inventories: Inventories[];
}
