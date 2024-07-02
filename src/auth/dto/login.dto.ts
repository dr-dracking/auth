import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @IsString()
  password: string;
}
