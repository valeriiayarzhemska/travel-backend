import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  destination: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;
}
