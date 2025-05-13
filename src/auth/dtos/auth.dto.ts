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

export class ReponseJWT {
  accessToken: string;
}

export class ResponseSignUp {
  name: string;

  @IsEmail()
  email: string;
}
