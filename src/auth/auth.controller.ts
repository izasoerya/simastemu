import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ReponseJWT,
  ResponseSignUp,
  UserSignInDto,
  UserSignUpDto,
} from './dtos/auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @ApiBody({ type: UserSignInDto })
  @ApiResponse({ status: 201, type: ReponseJWT })
  signIn(@Body() UserSignInDto: UserSignInDto): Promise<ReponseJWT> {
    return this.authService.userSignIn(UserSignInDto);
  }

  @Post('sign-up')
  @ApiBody({ type: UserSignUpDto })
  @ApiResponse({ status: 201, type: ResponseSignUp })
  signUp(@Body() UserSignUpDto: UserSignUpDto): Promise<ResponseSignUp> {
    return this.authService.userSignUp(UserSignUpDto);
  }
}
