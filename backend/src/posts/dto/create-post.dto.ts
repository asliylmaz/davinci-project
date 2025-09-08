import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  userId: number;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  body?: string;
}
