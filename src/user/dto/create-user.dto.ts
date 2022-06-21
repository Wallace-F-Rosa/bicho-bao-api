import { Person } from '@src/fhir/Person';

export class CreateUserDto {
  username: string;
  passwordHash: string;
  email: string;
  roles: string[];
  personalData: Person;
}
