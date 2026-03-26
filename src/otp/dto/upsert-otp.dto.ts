import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpsertOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
