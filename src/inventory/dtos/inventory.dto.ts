import { IsDate, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNotEmpty()
  imageURLs: string[];

  @IsNotEmpty()
  userUID: string;
}

export class PatchInventoryDto {
  id?: string;

  name?: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  imageURLs?: string[];
}

export class ResponseInventoryDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  imageURLs: string[];
}
