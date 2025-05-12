import { Injectable } from '@nestjs/common';
import { SignIn } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  userSignIn(user: SignIn): boolean {
    console.log('userSignIn', user.email, user.password);
    if (user.email === 'haha@gmail.com' && user.password === '123456') {
      return true;
    }
    return false;
  }
}
