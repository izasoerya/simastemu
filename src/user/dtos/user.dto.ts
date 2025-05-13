import { IsEmail } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  password_hashed: string;
}
