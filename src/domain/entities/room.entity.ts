import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  roomNumber: string;

  @Column({ type: 'int' })
  pricePerMonth: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @ManyToOne(() => Property, (property) => property.rooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @CreateDateColumn()
  createdAt: Date;
}
