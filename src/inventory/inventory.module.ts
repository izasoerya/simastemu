import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventories } from './entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventories])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
