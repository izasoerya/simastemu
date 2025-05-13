import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateInventoryDto, ResponseInventoryDto } from './dtos/inventory.dto';
import { InventoryService } from './inventory.service';
import { Request } from 'supertest';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createInventory(
    @Req() req,
    @Body() body: CreateInventoryDto,
  ): Promise<ResponseInventoryDto> {
    const createInventoryDto: CreateInventoryDto = {
      ...body,
      userUID: req.user.sub,
    };

    const res = await this.inventoryService.create(createInventoryDto);

    const responseInventoryDto: ResponseInventoryDto = {
      name: res.name,
      latitude: res.latitude,
      longitude: res.longitude,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      imageURLs: res.imageURLs,
    };

    return responseInventoryDto;
  }
}
