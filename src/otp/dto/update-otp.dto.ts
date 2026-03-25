import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOtpDto } from './create-otp.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateOtpDto extends PartialType(CreateOtpDto) {
  @ApiProperty()
  @IsEmail()
  email: string;
}
