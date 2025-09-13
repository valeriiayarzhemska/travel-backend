import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Trip } from '../../trips/entities/trip.entity';

@Entity()
export class BucketList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, { eager: true })
  user: User;

  @ManyToOne(() => Trip, trip => trip.id, { eager: true })
  trip: Trip;
}
