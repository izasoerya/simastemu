import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsString,
  IsOptional,
  IsArray,
  IsEmpty,
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

  @IsEmpty()
  userUID?: string;
}

export class PatchInventoryDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  spptNumber?: string;

  @IsOptional()
  @IsString()
  certificateNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsNumber()
  sizeArea?: number;

  @IsOptional()
  @IsNumber()
  landPrice?: number;

  @IsOptional()
  @IsNumber()
  njopPrice?: number;

  @IsOptional()
  @IsNumber()
  zonePrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
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
