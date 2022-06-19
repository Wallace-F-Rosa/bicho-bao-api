import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserService } from '@src/user/user.service';
import { UserModule } from '@src/user/user.module';
import { AppModule } from '@src/app.module';
import { AppService } from '@src/app.service';
import { faker } from '@faker-js/faker';

import {
  IdentifierType,
  IdentifierUse,
  NameUse,
  ContactPointSystem,
  ContactPointUse,
  AdministrativeGender,
} from '@fhir/Person';
import { CreateUserDto } from '@src/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let appService: AppService;
  const usersMockCreate = [];
  const usersMockList = [];

  beforeAll(() => {
    faker.locale = 'pt_BR';
  });

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
        const personalData = {
          identifier: {
            use: IdentifierUse.OFFICIAL,
            type: IdentifierType.TAX_ID,
            value: '844.977.040-84',
          },
          active: true,
          name: {
            use: NameUse.OFFICIAL,
            text: faker.name.findName(),
          },
          telecom: {
            system: ContactPointSystem.PHONE,
            value: faker.phone
              .phoneNumber('+## ### 9#### ####')
              .replace(/\s/g, ''),
            use: ContactPointUse.HOME,
          },
          gender: AdministrativeGender.OTHER,
          birthDate: Date.now(),
        };
        const userData = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          roles: ['admin'],
          personalData,
        };
        const res = await request(app.getHttpServer())
          .post('/users')
          .send(userData);
        console.log(userData);
        expect(res.status).toEqual(204);
        const { body } = res;
        expect(body).toMatchObject<CreateUserDto>(userData);
      });
    });
  });
});
