import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: `.env.production` });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC! === 'true',
  migrationsRun: true,
  migrations: ['dist/src/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
});
