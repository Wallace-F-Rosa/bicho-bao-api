import { Identifier, Person } from './Person';

export const enum QualificationCode {
  VETERINARY_DOCTOR = 'VD',
}

export interface Qualification {
  identifier: Identifier;
}

export interface Practitioner extends Person {
  qualification: Qualification;
}
