import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto, UserSignUpDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Get('sign-in')
  // signIn(@Body() UserSignInDto: UserSignInDto) {
  //   return this.authService.userSignIn(UserSignInDto);
  // }

  @Post('sign-up')
  signUp(@Body() UserSignUpDto: UserSignUpDto) {
    return this.authService.userSignUp(UserSignUpDto);
  }
}
