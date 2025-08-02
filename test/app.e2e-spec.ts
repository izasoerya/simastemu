import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

describe('e2e', () => {
  let app: INestApplication<App>;
  let database: DataSource;
  let accessToken: string;
  let singlePath: string;
  let multiplePath: string[];

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

    const filePath = path.resolve(__dirname, 'large-file.png');
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT')
        console.error('Failed to delete file:', err);
    });

    const uploadTestFolder = path.resolve(__dirname, '../uploads/test_db');
    fs.rm(uploadTestFolder, { recursive: true, force: true }, (err) => {
      if (err && err.code !== 'ENOENT')
        console.error('Failed to delete folder:', err);
    });
  });

  describe('e2e all', () => {
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

      expect(response.body.name).toEqual('test');
      expect(response.body.email).toEqual('test@gmail.com');
    });

    it('/auth/sign-in (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          email: payload.email,
          password: payload.password,
        })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      accessToken = response.body.accessToken;
    });

    it('/file/upload (POST)', async () => {
      const filePath = './test/large-file.png';
      const sizeInBytes = 1024 * 1024 + 1; // >1MB

      fs.writeFileSync(filePath, Buffer.alloc(sizeInBytes, 0));

      const response = await request(app.getHttpServer())
        .post(`/file/upload/sppt`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('file', filePath)
        .expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      singlePath = response.body[0].path;
    });

    it('/file/uploads/ (POST)', async () => {
      const filePath = './test/large-file.png';
      const sizeInBytes = 1024 * 1024 + 1; // >1MB

      fs.writeFileSync(filePath, Buffer.alloc(sizeInBytes, 0));

      const response = await request(app.getHttpServer())
        .post(`/file/uploads/sppt`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'multipart/form-data')
        .attach('files', filePath)
        .attach('files', filePath)
        .expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toEqual(2);
      multiplePath = response.body.map((e) => e.path);
    });

    it('/inventory/create (POST)', async () => {
      const payloadInventory = {
        name: 'Al-Maun',
        ownerName: 'John Doe',
        spptNumber: 'SPPT123456',
        certificateNumber: 'CERT987654',
        latitude: -7.825525,
        longitude: 110.336756,
        sizeArea: 1000,
        landPrice: 50000000,
        njopPrice: 45000000,
        zonePrice: 47000000,
        imageURLs: [singlePath],
      };
      const response = await request(app.getHttpServer())
        .post('/inventory/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payloadInventory)
        .expect(201);

      expect(response.body.name).toEqual(payloadInventory.name);
      expect(response.body.latitude).toEqual(payloadInventory.latitude);
      expect(response.body.longitude).toEqual(payloadInventory.longitude);
      expect(response.body.imageURLs.length).toEqual(1);
      expect(response.body.ownerName).toEqual(payloadInventory.ownerName);
      expect(response.body.spptNumber).toEqual(payloadInventory.spptNumber);
      expect(response.body.certificateNumber).toEqual(
        payloadInventory.certificateNumber,
      );
      expect(response.body.sizeArea).toEqual(payloadInventory.sizeArea);
      expect(response.body.landPrice).toEqual(payloadInventory.landPrice);
      expect(response.body.njopPrice).toEqual(payloadInventory.njopPrice);
      expect(response.body.zonePrice).toEqual(payloadInventory.zonePrice);
    });

    let inventoryResponse;
    it('/inventory/read (GET)', async () => {
      inventoryResponse = await request(app.getHttpServer())
        .get('/inventory/read')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(inventoryResponse.body)).toBe(true);
      expect(inventoryResponse.body[0].imageURLs[0]).toBe(singlePath);
    });

    it('/inventory/patch (PATCH)', async () => {
      const patchTest = {
        id: inventoryResponse.body[0].id,
        name: 'HeadQuarters',
        ownerName: 'Jane Doe',
        spptNumber: 'SPPT654321',
        certificateNumber: 'CERT123456',
        latitude: -7.825525,
        longitude: 110.336756,
        sizeArea: 2000,
        landPrice: 60000000,
        njopPrice: 55000000,
        zonePrice: 57000000,
        imageURLs: [singlePath],
      };
      const response = await request(app.getHttpServer())
        .patch('/inventory/patch')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(patchTest)
        .expect(200);

      expect(response.body.name).toBe('HeadQuarters');
      expect(response.body.ownerName).toBe('Jane Doe');
      expect(response.body.spptNumber).toBe('SPPT654321');
      expect(response.body.certificateNumber).toBe('CERT123456');
      expect(response.body.sizeArea).toBe(2000);
      expect(response.body.landPrice).toBe(60000000);
      expect(response.body.njopPrice).toBe(55000000);
      expect(response.body.zonePrice).toBe(57000000);
    });

    // it('/file/delete (DELETE)', async () => {
    //   const response = await request(app.getHttpServer())
    //     .delete(`/file/delete/${singlePath}`)
    //     .set('Authorization', `Bearer ${accessToken}`)
    //     .expect(200);
    // });
  });
});
