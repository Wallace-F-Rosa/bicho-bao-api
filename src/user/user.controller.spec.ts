import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AdministrativeGender,
  CommonLanguages,
  ContactPointSystem,
  ContactPointUse,
  IdentifierType,
  IdentifierUse,
  MimeType,
  NameUse,
  Person,
} from '@fhir/Person';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    describe('valid user', () => {
      it('owner', async () => {
        const personalData: Person = {
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
          birthDate: new Date(),
          photo: {
            contentType: MimeType.JPEG,
            url: faker.internet.avatar(),
          },
          communication: {
            language: CommonLanguages.PORTUGUESE_BRAZIL,
          },
        };
        const userData: CreateUserDto = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          roles: ['admin'],
          personalData,
        };
        expect(controller.create(userData)).toMatchObject(userData);
      });
    });
  });
});
