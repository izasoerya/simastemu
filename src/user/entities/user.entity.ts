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
  password_hashed: string;

  @Column('text')
  password_salt: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @OneToMany(() => Inventories, (inventory) => inventory.user)
  inventories: Inventories[];
}
