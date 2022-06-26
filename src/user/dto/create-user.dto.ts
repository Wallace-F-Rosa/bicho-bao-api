import { Person } from '@src/fhir/Person';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  personalData: Person;
}
