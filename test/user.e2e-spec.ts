import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { afterEach, beforeEach, describe } from 'node:test';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

let app: INestApplication;
let moduleFixture: TestingModule;

describe('user E2E test', () => {
  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('Should return not found', async () => {
    return request(app.getHttpServer())
      .get('/user/66fffb82a2b5b9ebb3514f02')
      .expect(404)
      .expect(
        '{\n' +
          '    "message": "The item not found",\n' +
          '    "error": "Not Found",\n' +
          '    "statusCode": 404\n' +
          '}',
      );
  });
});
