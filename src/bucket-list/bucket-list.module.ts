import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BucketListService } from './bucket-list.service';
import { BucketListController } from './bucket-list.controller';
import { BucketList } from './entities/bucket-list.entity';
import { User } from '../users/entities/user.entity';
import { Trip } from '../trips/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BucketList, User, Trip])],
  providers: [BucketListService],
  controllers: [BucketListController],
})
export class BucketListModule {}
