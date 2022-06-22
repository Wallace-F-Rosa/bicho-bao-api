import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import {
  AdministrativeGender,
  CommonLanguages,
  ContactPointSystem,
  ContactPointUse,
  IdentifierType,
  IdentifierUse,
  MimeType,
  NameUse,
} from '@fhir/Person';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  PatientRelationshipType,
  RelatedPerson,
} from '@src/fhir/RelatedPerson';

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
        const personalData: RelatedPerson = {
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
          relationship: PatientRelationshipType.ANIMAL_OWNER,
        };
        const userData: CreateUserDto = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          roles: ['admin'],
          personalData,
        };
        const createdUser = controller.create(userData);
        userData.passwordHash = UserService.getPasswordHash(userData.password);
        expect(controller.create(userData)).toMatchObject(userData);
      });
    });
  });
});
