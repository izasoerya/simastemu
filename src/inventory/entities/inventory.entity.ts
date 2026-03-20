import { Users } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const numericTransformer = {
  to: (value?: number | null) => value,
  from: (value?: string | null) => {
    if (value === null || value === undefined) {
      return value;
    }
    return Number(value);
  },
};

@Entity()
export class Inventories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Users, (user) => user.inventories, { nullable: false })
  owner: Users;

  @Column()
  spptNumber: string;

  @Column()
  certificateNumber: string;

  @Column('numeric', {
    precision: 9,
    scale: 6,
    transformer: numericTransformer,
  })
  latitude: number;

  @Column('numeric', {
    precision: 9,
    scale: 6,
    transformer: numericTransformer,
  })
  longitude: number;

  @Column('numeric', { transformer: numericTransformer })
  sizeArea: number;

  @Column('numeric', { transformer: numericTransformer })
  landPrice: number;

  @Column('numeric', { transformer: numericTransformer })
  njopPrice: number;

  @Column('numeric', { transformer: numericTransformer })
  zonePrice: number;

  @Column('text', { array: true, nullable: false })
  imageURLs: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column('numeric', { nullable: true, transformer: numericTransformer })
  flagStatus?: number;
}
