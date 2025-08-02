import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsString,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  certificateNumber: string;

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
  @IsNumber()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  zonePrice: number;

  @IsNotEmpty()
  @IsNotEmpty()
  imageURLs: string[];

  userUID: string;
}

export class PatchInventoryDto {
  id?: string;

  name?: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  certificateNumber: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsNotEmpty()
  @IsNumber()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  zonePrice: number;

  imageURLs?: string[];
}

export class ResponseInventoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  certificateNumber: string;

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
  @IsNumber()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  zonePrice: number;

  @IsNotEmpty()
  imageURLs: string[];

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
