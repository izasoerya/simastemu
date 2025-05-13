import { Injectable } from '@nestjs/common';
import { ResponseAuthDto, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async userSignIn(user: UserSignInDto): Promise<ResponseAuthDto> {
    const loggedUser = await this.userService.findOne(
      user.email,
      user.password,
    );
    const res: ResponseAuthDto = {
      uid: loggedUser.uid,
      name: loggedUser.name,
      email: loggedUser.email,
      createdAt: loggedUser.createdAt,
    };
    return res;
  }

  async userSignUp(user: UserSignUpDto): Promise<ResponseAuthDto> {
    const createUserDto: CreateUserDto = {
      ...user,
    };

    const newUser = await this.userService.createUser(createUserDto);
    const res: ResponseAuthDto = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
    return res;
  }
}
