import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
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
import { PatientRelationshipType } from '@src/fhir/RelatedPerson';

import * as bcrypt from 'bcrypt';
import { PrismaService } from '@src/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user', () => {
    describe('valid user', () => {
      it('owner', async () => {
        const personalData = {
          create: {
            identifier: {
              create: {
                use: IdentifierUse.OFFICIAL.toString(),
                type: IdentifierType.TAX_ID.toString(),
                value: '844.977.040-84',
              },
            },
            active: true,
            name: {
              create: {
                use: NameUse.OFFICIAL.toString(),
                text: faker.name.findName(),
              },
            },
            telecom: {
              create: {
                system: ContactPointSystem.PHONE.toString(),
                value: faker.phone
                  .phoneNumber('+## ### 9#### ####')
                  .replace(/\s/g, ''),
                use: ContactPointUse.HOME.toString(),
              },
            },
            gender: AdministrativeGender.OTHER.toString(),
            birthDate: new Date(),
            photo: {
              create: {
                contentType: MimeType.JPEG.toString(),
                url: faker.internet.avatar(),
              },
            },
            communication: {
              create: {
                language: CommonLanguages.PORTUGUESE_BRAZIL.toString(),
              },
            },
            relationship: PatientRelationshipType.ANIMAL_OWNER.toString(),
          },
        };
        const userData = {
          username: faker.internet.userName(),
          passwordHash: await service.getPasswordHash(
            faker.internet.password(),
          ),
          email: faker.internet.email(),
          personalData,
        };
        const user = await service.createOwnerUser(userData);
        console.log(user);
        expect(user).toMatchObject(userData);
      });
    });
  });
});
