import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTripDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  destination?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  description?: string;
}
