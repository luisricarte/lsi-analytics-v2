import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
