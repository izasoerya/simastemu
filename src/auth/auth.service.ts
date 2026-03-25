import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseSignUp, UserSignInDto, UserSignUpDto } from './dtos/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import { OtpService } from 'src/otp/otp.service';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class AuthService {
  private static readonly OTP_TTL_MINUTES = 3;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  private async getOtpEmailHtml(
    otpCode: string,
    email: string,
    requestedAt: Date,
  ): Promise<string> {
    const templatePath = join(__dirname, 'page', 'otp.html');
    const template = await readFile(templatePath, 'utf-8');

    return template
      .replace(/{{OTP_CODE}}/g, otpCode)
      .replace(
        /{{OTP_EXPIRE_MINUTES}}/g,
        AuthService.OTP_TTL_MINUTES.toString(),
      )
      .replace(/{{REQUESTED_EMAIL}}/g, email)
      .replace(/{{REQUESTED_AT}}/g, requestedAt.toISOString());
  }

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
    this.logger.log(`User created with email: ${res.email}`);
    return res;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.findOne({
      email: email,
    });
    if (user === null) {
      throw new UnauthorizedException('Email does not exist');
    }

    if (process.env.SMTP_API_KEY?.startsWith('re_')) {
      const resend = new Resend(process.env.SMTP_API_KEY);
      const otp = await this.otpService.create({
        email: email,
      });
      const html = await this.getOtpEmailHtml(otp.otp, email, new Date());

      const { error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Your SIMASTEMU OTP Code',
        html,
      });

      if (error) {
        this.logger.fatal(`Failed to send email: ${email}`);
        throw new InternalServerErrorException(
          'Something went wrong, try again later',
        );
      }
    } else {
      this.logger.debug('In testing mode, skipping send email');
    }

    return true;
  }
}
