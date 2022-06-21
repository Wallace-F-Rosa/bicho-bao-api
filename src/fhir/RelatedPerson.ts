import { Person } from './Person';

export const enum PatientRelationshipType {
  BILLING_CONTACT_PERSON = 'BP',
  ANIMAL_OWNER = 'AO',
  CONTACT_PERSON = 'CP',
}

export interface RelatedPerson extends Person {
  relationship: PatientRelationshipType;
}
