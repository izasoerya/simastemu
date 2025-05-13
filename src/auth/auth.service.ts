import { Injectable } from '@nestjs/common';
import { Users } from '../user/entities/user.entity';
import { ResponseAuthDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // userSignIn(): boolean {
  //   console.log('userSignIn', user.email, user.password);
  //   if (user.email === 'haha@gmail.com' && user.password === '123456') {
  //     return true;
  //   }
  //   return false;
  // }

  async userSignUp(user: UserSignUpDto): Promise<ResponseAuthDto> {
    const hashedPassword = 'later will be fixed >.<';
    const createUserDto: CreateUserDto = {
      ...user,
      password_hashed: hashedPassword,
    };
    const newUser = await this.userService.createUser(createUserDto);
    const res: ResponseAuthDto = {
      name: newUser.name,
      email: newUser.email,
    };
    return res;
  }
}
