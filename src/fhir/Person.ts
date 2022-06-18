export const enum IdentifierType {
  DRIVERS_LINCENSE = 'DL',
  PASSPORT_NUMBER = 'PPN',
  BREED_REGISTRY_NUMBER = 'PPN',
  MEDICAL_RECORD_NUMBER = 'MR',
  MICROCHIP_NUMBER = 'MCN',
  EMPLOYER_NUMBER = 'EN',
  TAX_ID = 'TAX',
  NATIONAL_INSURANCE_PAYOR_ID = 'NIIP',
  PROVIDER_NUMBER = 'PRN',
  MEDICAL_LICENSE_NUMBER = 'MD',
  DONOR_REGISTRATION_NUMBER = 'DR',
  ACCESSION_ID = 'ACSN',
  UNIVERSAL_DEVICE_ID = 'UDI',
  SERIAL_NUMBER = 'SNO',
  SOCIAL_BENEFICIARY_ID = 'SB',
  PLACER_ID = 'PLAC',
  FILLER_ID = 'FILL',
  JURISDITIONAL_HEALTH_NUMBER = 'JHN',
}

export enum IdentifierUse {
  USUAL = 'usual',
  OFFICIAL = 'official',
  TEMP = 'temp',
  SECONDARY = 'secondary',
  OLD = 'old',
}

export interface Identifier {
  use: IdentifierUse;
  type: IdentifierType;
  value: string;
}

export const enum NameUse {
  USUAL = 'usual',
  OFFICIAL = 'official',
  TEMP = 'temp',
  NICKNAME = 'nickname',
  ANONYMOUS = 'anonymous',
  OLD = 'old',
  MAIDEN = 'maiden',
}

export interface HumanName {
  use: NameUse;
  text: string;
  family: string;
}

export const enum ContactPointSystem {
  PHONE = 'phone',
  FAX = 'fax',
  EMAIL = 'email',
  PAGER = 'pager',
  URL = 'url',
  SMS = 'sms',
  OTHER = 'other',
}

export const enum ContactPointUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  MOBILE = 'mobile',
}

export interface ContactPoint {
  system: ContactPointSystem;
  value: string;
  use: ContactPointUse;
}

export interface Person {
  identifier: Identifier;
  active: boolean;
  name: HumanName;
  telecom: ContactPoint;
}
