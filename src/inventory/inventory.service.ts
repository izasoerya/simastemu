import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventories } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { CreateInventoryDto, PatchInventoryDto } from './dtos/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventories)
    private repo: Repository<Inventories>,
  ) {}

  async create(dto: CreateInventoryDto) {
    const newInventory = this.repo.create({
      ...dto,
      user: { uid: dto.userUID },
    });
    return this.repo.save(newInventory);
  }

  async read(userId?: string) {
    return userId
      ? this.repo.findBy({ user: { uid: userId } })
      : this.repo.find();
  }

  async patch(id: string, inventory: PatchInventoryDto) {
    const existingInventory = await this.repo.findOneBy({ id });

    if (!existingInventory) {
      throw new Error(`Inventory with id ${id} not found`);
    }

    const updatedInventory = this.repo.merge(existingInventory, inventory);
    return this.repo.save(updatedInventory);
  }
}
