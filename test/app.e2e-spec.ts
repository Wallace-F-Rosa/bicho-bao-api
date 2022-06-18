import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserService } from '@src/user/user.service';
import { UserModule } from '@src/user/user.module';
import { AppModule } from '@src/app.module';
import { AppService } from '@src/app.service';

import { Identifier, IdentifierType, IdentifierUse } from '@fhir/Identifier';
import { HumanName, NameUse } from '@fhir/HumanName';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let appService: AppService;
  const usersMockCreate = [];
  const usersMockList = [];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    userService = new UserService();
    appService = new AppService();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(appService?.getHello());
  });

  describe('/users', () => {
    describe('create', () => {
      it('valid user', async () => {
        const userData = {
          username: 'teste',
          password: '123teste',
          roles: ['admin'],
          personalData: {
            identifier: {
              use: IdentifierUse.OFFICIAL,
              type: IdentifierType.TAX_ID,
              value: '844.977.040-84',
            },
            active: true,
            name: {
              use: NameUse.OFFICIAL,
              text: 'Testinho Unit Test',
              family: 'Unit Test',
            },
          },
        };
        const res = await request(app.getHttpServer())
          .post('/users')
          .send(userData);
        expect(res.status).toEqual(204);
        const { body } = res;
        expect(body).toMatchObject(userData);
      });
    });
  });
});
