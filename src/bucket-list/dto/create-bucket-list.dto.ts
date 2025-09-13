import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateBucketListDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  tripId: number;
}
