import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  IsEmpty,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmpty({ message: 'ownerId is handled by Backend' })
  @ApiPropertyOptional()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  certificateNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  zonePrice: number;

  @IsNotEmpty()
  @ApiProperty()
  imageURLs: string[];
}

export class PatchInventoryDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
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
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  spptNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  certificateNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  sizeArea: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  landPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  njopPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  zonePrice: number;

  @IsNotEmpty()
  @ApiProperty()
  imageURLs: string[];

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
