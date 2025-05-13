import { IsDate, IsNumeric, IsUrl } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateInventoryDto {
  name: string;

  @IsNumeric()
  latitude: number;

  @IsNumeric()
  longitude: number;

  imageURLs: string[];

  userUID: string;
}

export class ResponseInventoryDto {
  name: string;

  @IsNumeric()
  latitude: number;

  @IsNumeric()
  longitude: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  imageURLs: string[];
}

export class ResponseFileDto {
  @IsUrl()
  url: string;
}
