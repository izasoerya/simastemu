import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiPropertyOptional()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  certificateNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiPropertyOptional()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiPropertyOptional()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  zonePrice: number;

  @IsNotEmpty()
  @ApiPropertyOptional()
  imageURLs: string[];
}

export class PatchInventoryDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiPropertyOptional()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiPropertyOptional()
  ownerId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  spptNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  certificateNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiPropertyOptional()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiPropertyOptional()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  sizeArea?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  landPrice?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  njopPrice?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  zonePrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  imageURLs?: string[];
}

export class ResponseInventoryDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiPropertyOptional()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiPropertyOptional()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  certificateNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiPropertyOptional()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiPropertyOptional()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional()
  zonePrice: number;

  @IsNotEmpty()
  @ApiPropertyOptional()
  imageURLs: string[];

  @IsNotEmpty()
  @IsDate()
  @ApiPropertyOptional()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiPropertyOptional()
  updatedAt: Date;
}
