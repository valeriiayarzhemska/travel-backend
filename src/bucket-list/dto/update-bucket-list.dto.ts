import { IsOptional, IsInt, IsPositive } from 'class-validator';

export class UpdateBucketListDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  tripId?: number;
}
