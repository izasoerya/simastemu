import { ApiProperty } from '@nestjs/swagger';

export class ResponseFileDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  size: number;
}
