import { IsEmail } from 'class-validator';

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
  name: string;

  @IsEmail()
  email: string;
}
