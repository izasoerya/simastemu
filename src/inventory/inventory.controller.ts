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
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateInventoryDto,
  PatchInventoryDto,
  ResponseInventoryDto,
} from './dtos/inventory.dto';
import { InventoryService } from './inventory.service';
import { Inventories } from './entities/inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createInventory(
    @Req() req,
    @Body() body: CreateInventoryDto,
  ): Promise<ResponseInventoryDto> {
    const payload: CreateInventoryDto = {
      ...body,
      ownerId: req.user.sub,
    };
    const inventory: Inventories = await this.inventoryService.create(payload);

    return {
      ...inventory,
      ownerId: inventory.owner.uid,
    };
  }

  @UseGuards(AuthGuard)
  @Get('read')
  async getInventory(@Req() req): Promise<ResponseInventoryDto[]> {
    const inventories = await this.inventoryService.read(req.user.sub);
    return inventories.map((inventory) => {
      return {
        ...inventory,
        ownerId: inventory.owner.uid,
      };
    });
  }

  @UseGuards(AuthGuard)
  @Get('readAll')
  async getAllInventory(): Promise<ResponseInventoryDto[]> {
    const res = await this.inventoryService.read(undefined);
    return res.map((inventory) => {
      return {
        ...inventory,
        ownerId: inventory.owner.uid,
      };
    });
  }

  @UseGuards(AuthGuard)
  @Patch('patch')
  async patchInventory(
    @Req() req,
    @Body() body: PatchInventoryDto,
  ): Promise<ResponseInventoryDto> {
    if (body.ownerId !== req.user.sub) {
      throw new ForbiddenException('User did not own this inventory');
    }

    const inventory = await this.inventoryService.patch(body);
    return {
      ...inventory,
      ownerId: inventory.owner.uid,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteInventory(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
