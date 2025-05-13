import { Injectable } from '@nestjs/common';
import { ResponseAuthDto, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async userSignIn(user: UserSignInDto): Promise<ResponseAuthDto> {
    const hashedPassword = 'later will be fixed >.<';
    const loggedUser = await this.userService.findOne(
      user.email,
      hashedPassword,
    );
    return loggedUser;
  }

  async userSignUp(user: UserSignUpDto): Promise<ResponseAuthDto> {
    const hashedPassword = 'later will be fixed >.<';
    const createUserDto: CreateUserDto = {
      ...user,
      password_hashed: hashedPassword,
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
