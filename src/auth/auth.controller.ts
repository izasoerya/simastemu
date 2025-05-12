import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('sign-in')
  signIn(@Body() UserSignInDto: UserSignInDto) {
    return this.authService.userSignIn(UserSignInDto);
  }
}
