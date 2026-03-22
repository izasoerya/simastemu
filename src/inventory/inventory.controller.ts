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
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateInventoryDto,
  PatchInventoryDto,
  ResponseInventoryDto,
} from './dtos/inventory.dto';
import { InventoryService } from './inventory.service';
import { Inventories } from './entities/inventory.entity';

@ApiBearerAuth('jwt')
@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiResponse({ status: 201, type: ResponseInventoryDto })
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
  @ApiResponse({ status: 200, type: ResponseInventoryDto, isArray: true })
  async getInventory(@Req() req): Promise<ResponseInventoryDto[]> {
    const inventories = await this.inventoryService.read(req.user.sub);
    return inventories.map((inventory: Inventories) => {
      const { owner, ...inventoryResponseDto } = inventory; // Strip owner entity
      const response: ResponseInventoryDto = {
        ...inventoryResponseDto,
        ownerId: owner.uid,
      };
      return response;
    });
  }

  @UseGuards(AuthGuard)
  @Get('readAll')
  @ApiResponse({ status: 200, type: ResponseInventoryDto, isArray: true })
  async getAllInventory(): Promise<ResponseInventoryDto[]> {
    const res = await this.inventoryService.read(undefined);
    return res.map((inventory) => {
      const { owner, ...inventoryResponseDto } = inventory; // Strip owner entity
      const response: ResponseInventoryDto = {
        ...inventoryResponseDto,
        ownerId: owner.uid,
      };
      return response;
    });
  }

  @UseGuards(AuthGuard)
  @Patch('patch')
  @ApiResponse({ status: 200, type: ResponseInventoryDto })
  async patchInventory(
    @Req() req,
    @Body() body: PatchInventoryDto,
  ): Promise<ResponseInventoryDto> {
    if (body.ownerId !== req.user.sub) {
      throw new ForbiddenException('User did not own this inventory');
    }

    const inventory = await this.inventoryService.patch(body);
    const { owner, ...inventoryResponseDto } = inventory; // Strip owner entity
    const response: ResponseInventoryDto = {
      ...inventoryResponseDto,
      ownerId: owner.uid,
    };
    return response;
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Inventory id',
  })
  @ApiResponse({ status: 200, description: 'Inventory deleted' })
  deleteInventory(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
