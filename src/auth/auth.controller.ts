import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseAuthDto, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('sign-in')
  signIn(@Body() UserSignInDto: UserSignInDto): Promise<ResponseAuthDto> {
    return this.authService.userSignIn(UserSignInDto);
  }

  @Post('sign-up')
  signUp(@Body() UserSignUpDto: UserSignUpDto): Promise<ResponseAuthDto> {
    return this.authService.userSignUp(UserSignUpDto);
  }
}
