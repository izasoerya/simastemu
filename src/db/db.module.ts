import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.POSTGRES_USER,
        password: `${process.env.POSTGRES_PASSWORD}`,
        database: process.env.POSTGRES_DB,
        synchronize: process.env.DB_SYNC! === 'true',
        autoLoadEntities: true,
        entities: ['dist/**/*.entity.js'],
      }),
    }),
  ],
})
export class DbModule {}
