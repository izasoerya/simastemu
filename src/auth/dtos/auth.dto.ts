import { IsEmail, IsDate } from 'class-validator';
import { Timestamp } from 'typeorm';

export class UserSignInDto {
  @IsEmail()
  email: string;

  password: string;
}

export class UserSignUpDto {
  name: string;

  @IsEmail()
  email: string;

  password: string;
}

export class ResponseAuthDto {
  uid: string;

  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Timestamp;
}
