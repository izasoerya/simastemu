import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [AuthModule, DbModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
