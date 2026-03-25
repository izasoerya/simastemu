import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
