import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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
  CommonLanguages,
  MimeType
} from '@fhir/Person';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { PatientRelationshipType } from '@src/fhir/RelatedPerson';
import { UserController } from '@src/user/user.controller';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserService } from '@src/user/user.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userController: UserController;
  let appService: AppService;
  const usersMockCreate = [];
  const usersMockList = [];

  beforeAll(() => {
    faker.locale = 'pt_BR';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
      controllers: [UserController],
      providers: [PrismaService, UserService]
    }).compile();

    userController = moduleFixture.get<UserController>(UserController);
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
      it('valid owner user', async () => {
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
          photo: {
            contentType: MimeType.JPEG,
            url: faker.internet.avatar(),
          },
          gender: AdministrativeGender.OTHER,
          birthDate: new Date(),
          communication: [{
            language: CommonLanguages.PORTUGUESE_BRAZIL
          }],
          relationship: PatientRelationshipType.ANIMAL_OWNER
        };
        const userData = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          personalData,
        };
        const res = await request(app.getHttpServer())
          .post('/users/owner')
          .send(userData);
        expect(res.status).toEqual(204);
        const { body } = res;
        expect(body).toMatchObject<CreateUserDto>(userData);
      });
    });
  });
});
