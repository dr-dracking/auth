import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @Transform(({ value }) => value.trim().toLowerCase())
  username: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @IsEnum(Role, { each: true })
  @IsOptional()
  roles: Role[];

  @IsUUID()
  createdBy: string;
}
