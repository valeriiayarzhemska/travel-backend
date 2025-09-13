import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BucketListService } from './bucket-list.service';
import { CreateBucketListDto } from './dto/create-bucket-list.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bucket-list')
@UseGuards(JwtAuthGuard)
export class BucketListController {
  constructor(private readonly bucketService: BucketListService) {}

  @Post()
  add(@Body(ValidationPipe) createBucketListDto: CreateBucketListDto) {
    return this.bucketService.addToBucketList(createBucketListDto);
  }

  @Get(':userId')
  getUserBucket(@Param('userId', ParseIntPipe) userId: number) {
    return this.bucketService.getUserBucketList(userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bucketService.removeFromBucketList(id);
  }
}
