import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventories } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { CreateInventoryDto, PatchInventoryDto } from './dtos/inventory.dto';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    @InjectRepository(Inventories)
    private repo: Repository<Inventories>,
  ) {}

  async create(dto: CreateInventoryDto) {
    const newInventory = this.repo.create({
      ...dto,
      user: { uid: dto.userUID },
    });
    const saved = await this.repo.save(newInventory);
    this.logger.log(
      `Created inventory successfully: ${saved.name} (ID: ${saved.id})`,
    );
    return saved;
  }

  async read(userId?: string) {
    if (userId) {
      const inventories = await this.repo.findBy({ user: { uid: userId } });
      this.logger.log(
        `Found ${inventories.length} inventories for user ${userId}`,
      );
      return inventories;
    } else {
      const inventories = await this.repo.find();
      this.logger.log(`Found ${inventories.length} inventories in total`);
      return inventories;
    }
  }

  async patch(id: string, inventory: PatchInventoryDto) {
    const existingInventory = await this.repo.findOneBy({ id });
    if (!existingInventory) {
      this.logger.error(`Inventory with ID ${id} not found`);
      throw new NotFoundException(`Inventory with id ${id} not found`);
    }

    const filteredInventory = Object.fromEntries(
      Object.entries(inventory).filter(
        ([_, value]) => value !== null && value !== undefined,
      ),
    );

    const updatedInventory = this.repo.merge(
      existingInventory,
      filteredInventory,
    );
    const saved = await this.repo.save(updatedInventory);
    this.logger.log(`Patched inventory with ID ${id} successfully`);
    return saved;
  }

  async remove(id: string) {
    const deletedInventory = await this.repo.delete({ id: id });
    this.logger.log(
      `Removed inventory with ID ${id}. Affected rows: ${deletedInventory.affected}`,
    );
    return deletedInventory;
  }
}
