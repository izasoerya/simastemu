import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventories } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dtos/inventory.dto';

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
}
