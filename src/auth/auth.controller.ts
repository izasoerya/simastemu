import { Body, Controller, Header, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
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
    return this.authService.signIn(UserSignInDto);
  }

  @Post('sign-up')
  @ApiBody({ type: UserSignUpDto })
  @ApiResponse({ status: 201, type: ResponseSignUp })
  signUp(@Body() UserSignUpDto: UserSignUpDto): Promise<ResponseSignUp> {
    return this.authService.signUp(UserSignUpDto);
  }

  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 201, type: Boolean })
  @Header('Content-Type', 'application/json')
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(body.email);
  }
}
