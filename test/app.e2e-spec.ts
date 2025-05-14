import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import {
  CreateInventoryDto,
  ResponseInventoryDto,
} from 'src/inventory/dtos/inventory.dto';

describe('e2e', () => {
  let app: INestApplication<App>;
  let database: DataSource;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    database = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    if (database) {
      await database.dropDatabase();
      await database.destroy();
    }
    await app.close();
  });

  describe('e2e authentication', () => {
    const payload = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'hashed',
    };

    it('/auth/sign-up (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(payload)
        .expect(201);

      expect(response.body).toHaveProperty('email');
    });

    it('/auth/sign-in (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/sign-in')
        .send({
          email: payload.email,
          password: payload.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      accessToken = response.body.accessToken;
    });

    const payloadInventory = {
      name: 'Al-Maun',
      latitude: -7.825525,
      longitude: 110.336756,
      imageURLs: [],
    };

    it('/inventory/create (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/inventory/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payloadInventory)
        .expect(201);

      expect(response.body).toHaveProperty('name');
    });

    let inventoryResponse;
    it('/inventory/read (GET)', async () => {
      inventoryResponse = await request(app.getHttpServer())
        .get('/inventory/read')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(inventoryResponse.body)).toBe(true);
      expect(inventoryResponse.body.length).toBeGreaterThan(0);
    });

    it('/inventory/patch (PATCH)', async () => {
      const patchTest = {
        id: inventoryResponse.id,
      };
      const response = await request(app.getHttpServer())
        .patch('/inventory/patch')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(patchTest)
        .expect(200);

      expect(response.body).toHaveProperty('name');
    });
  });
});
