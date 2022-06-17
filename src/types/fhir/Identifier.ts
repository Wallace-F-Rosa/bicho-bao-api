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

export type Identifier = {
  use: IdentifierUse;
  type: IdentifierType;
  value: string;
};
