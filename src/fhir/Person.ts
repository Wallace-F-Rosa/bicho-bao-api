import { Qualification } from './Practitioner';
import { PatientRelationshipType } from './RelatedPerson';

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

export const enum AdministrativeGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  UNKOWN = 'unkown',
}

export const enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

export interface Attachment {
  contentType: MimeType;
  url: string;
}

export const enum AddressUse {
  HOME = 'home',
  WORK = 'work',
  TEMP = 'temp',
  OLD = 'old',
  BILLING = 'billing',
}

export const enum AddressType {
  POSTAL = 'postal',
  PHYSICAL = 'physical',
  BOTH = 'both',
}

export interface Period {
  start: Date;
  end: Date;
}

export interface Address {
  use: AddressUse;
  type: AddressType;
  line: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  period: Period;
}

export const enum CommonLanguages {
  ARABIC = 'ar',
  BENGALI = 'bn',
  CZECH = 'cs',
  DANISH = 'da',
  GERMAN = 'de',
  GERMAN_AUSTRIA = 'de-AT',
  GERMAN_SWITZERLAND = 'de-CH',
  GERMAN_GERMANY = 'de-DE',
  GREEK = 'el',
  ENGLISH = 'en',
  ENGLISH_AUSTRALIA = 'en-AU',
  ENGLISH_CANADA = 'en-CA',
  ENGLISH_GREAT_BRITAIN = 'en-GB',
  ENGLISH_INDIA = 'en-IN',
  ENGLISH_NEW_ZELAND = 'en-NZ',
  ENGLISH_SINGAPORE = 'en-SG',
  ENGLISH_UNITED_STATES = 'en-US',
  SPANISH = 'es',
  SPANISH_ARGENTINA = 'es-AR',
  SPANISH_SPAIN = 'es-ES',
  SPANISH_URUGUAY = 'es-UY',
  FINNISH = 'fi',
  FRENCH = 'fr',
  FRENCH_BELGIUM = 'fr-BE',
  FRENCH_SWITZERLAND = 'fr-CH',
  FRENCH_FRANCE = 'fr-FR',
  FRYSIAN = 'fy',
  FRYSIAN_NETHERLANDS = 'fy-NL',
  HINDI = 'hi',
  CROATIAN = 'hr',
  ITALIAN = 'it',
  ITALIAN_SWITZERLAND = 'it-CH',
  ITALIAN_ITALY = 'it-IT',
  JAPANESE = 'ja',
  KOREAN = 'ko',
  DUTCH = 'nl',
  DUTCH_BELGIUM = 'nl-BE',
  DUTCH_NETHERLANDS = 'nl-NL',
  NORWEGIAN = 'no',
  NORWEGIAN_NORWAY = 'no-NO',
  PUNJABI = 'pa',
  POLISH = 'pl',
  PORTUGUESE = 'pt',
  PORTUGUESE_BRAZIL = 'pt-BR',
  RUSSIAN = 'ru',
  RUSSIAN_RUSSIA = 'ru-RU',
  SERBIAN = 'sr',
  SERBIAN_SERBIA = 'sr-RS',
  SWEDISH = 'sv',
  SWEDISH_SWEDEN = 'sv-SE',
  TELEGU = 'te',
  CHINESE = 'zh',
  CHINESE_CHINA = 'zh-CN',
  CHINESE_HONG_KONG = 'zh-HK',
  CHINESE_SINGAPORE = 'zh-SG',
  CHINESE_TAIWAN = 'zh-TW',
}

export interface Communication {
  language: CommonLanguages;
}

export interface Person {
  identifier: Identifier;
  active: boolean;
  name: HumanName;
  telecom: ContactPoint;
  gender: AdministrativeGender;
  birthDate: Date;
  photo: Attachment;
  communication: Communication[];
  relationship: PatientRelationshipType;
  qualification?: Qualification;
}
