import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BucketList } from './entities/bucket-list.entity';
import { User } from '../users/entities/user.entity';
import { Trip } from '../trips/entities/trip.entity';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';

@Injectable()
export class BucketListService {
  constructor(
    @InjectRepository(BucketList)
    private bucketListRepo: Repository<BucketList>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Trip)
    private tripRepo: Repository<Trip>
  ) {}

  async addToBucketList(createBucketListDto: CreateBucketListDto): Promise<BucketList> {
    const user = await this.userRepo.findOne({ where: { id: createBucketListDto.userId } });
    const trip = await this.tripRepo.findOne({ where: { id: createBucketListDto.tripId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    const existingItem = await this.bucketListRepo.findOne({
      where: {
        user: { id: createBucketListDto.userId },
        trip: { id: createBucketListDto.tripId },
      },
    });

    if (existingItem) {
      throw new ConflictException('Trip is already in your bucket list');
    }

    const bucketItem = this.bucketListRepo.create({ user, trip });
    return this.bucketListRepo.save(bucketItem);
  }

  async getUserBucketList(userId: number): Promise<BucketList[]> {
    return this.bucketListRepo.find({
      where: { user: { id: userId } },
      relations: ['trip'],
    });
  }

  async removeFromBucketList(id: number): Promise<{ message: string }> {
    const item = await this.bucketListRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Bucket list item not found');
    }
    await this.bucketListRepo.remove(item);
    return { message: 'Removed from bucket list' };
  }
}
