import { IsEmail } from 'class-validator';

export class UserSignInDto {
  @IsEmail()
  email: string;

  password: string;
}
