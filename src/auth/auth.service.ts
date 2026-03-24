import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ResponseSignUp, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: UserSignInDto): Promise<{ accessToken: string }> {
    const loggedUser = await this.userService.findOne({
      email: user.email,
    });
    if (loggedUser === null) {
      throw new UnauthorizedException('Email does not exist');
    }

    const compareHash = await bcrypt.compare(
      user.password,
      loggedUser.password_hashed,
    );
    if (compareHash) {
      const payload = { sub: loggedUser.uid, name: loggedUser.name };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException('Password does not match');
  }

  async signUp(user: UserSignUpDto): Promise<ResponseSignUp> {
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

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.findOne({
      email: email,
    });
    if (user === null) {
      throw new UnauthorizedException('Email does not exist');
    }
    // TODO: CREATE SMTP TO SEND OTP
    return true;
  }
}
