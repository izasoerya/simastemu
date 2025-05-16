import { IsDate, IsNumeric, IsUrl } from 'class-validator';

export class CreateInventoryDto {
  name: string;

  @IsNumeric()
  latitude: number;

  @IsNumeric()
  longitude: number;

  imageURLs: string[];

  userUID: string;
}

export class PatchInventoryDto {
  id?: string;

  name?: string;

  @IsNumeric()
  latitude?: number;

  @IsNumeric()
  longitude?: number;

  imageURLs?: string[];
}

export class ResponseInventoryDto {
  id: string;

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
