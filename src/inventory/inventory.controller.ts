import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateInventoryDto,
  PatchInventoryDto,
  ResponseInventoryDto,
} from './dtos/inventory.dto';
import { InventoryService } from './inventory.service';

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

    Object.entries(createInventoryDto).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        throw new BadRequestException(`Missing or invalid value for: ${key}`);
      }
    });

    const res = await this.inventoryService.create(createInventoryDto);
    const { user, ...responseInventoryDto } = res;
    return responseInventoryDto;
  }

  @UseGuards(AuthGuard)
  @Get('read')
  async getInventory(@Req() req): Promise<ResponseInventoryDto[]> {
    const inventories = await this.inventoryService.read(req.user.sub);
    return inventories.map(({ user, ...rest }) => rest);
  }

  @UseGuards(AuthGuard)
  @Get('readAll')
  async getAllInventory(): Promise<ResponseInventoryDto[]> {
    const res = await this.inventoryService.read(undefined);
    return res;
  }

  @UseGuards(AuthGuard)
  @Patch('patch')
  async patchInventory(
    @Body() body: PatchInventoryDto,
  ): Promise<ResponseInventoryDto> {
    const res = await this.inventoryService.patch(body.id!, body);
    return res;
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteInventory(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
