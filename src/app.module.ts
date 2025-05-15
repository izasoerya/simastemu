import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { InventoryModule } from './inventory/inventory.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, DbModule, InventoryModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
