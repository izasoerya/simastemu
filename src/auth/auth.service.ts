import { Injectable } from '@nestjs/common';
import { ResponseSignUp, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async userSignIn(user: UserSignInDto): Promise<{ accessToken: string }> {
    const loggedUser = await this.userService.findOne(
      user.email,
      user.password,
    );
    const payload = { sub: loggedUser.uid, name: loggedUser.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async userSignUp(user: UserSignUpDto): Promise<ResponseSignUp> {
    const createUserDto: CreateUserDto = {
      ...user,
    };

    const newUser = await this.userService.createUser(createUserDto);
    const res: ResponseSignUp = {
      name: newUser.name,
      email: newUser.email,
    };
    return res;
  }
}
