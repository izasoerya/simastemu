import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { InventoryModule } from './inventory/inventory.module';
import { FileModule } from './file/file.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [AuthModule, DbModule, InventoryModule, FileModule, OtpModule],
  controllers: [TestController],
  providers: [TestService],
})
export class AppModule {}
