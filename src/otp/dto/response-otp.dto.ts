import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';

export class ResponseOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  otp: string;

  @ApiProperty()
  @IsDate()
  expiresAt: Date;
}
