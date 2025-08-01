import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const nodeEnv = process.env.NODE_ENV;
config({ path: `.env.${nodeEnv}` });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: `${process.env.DB_PASSWORD}`,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC! === 'true',
  migrationsRun: false,
  migrations: ['dist/src/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
});
