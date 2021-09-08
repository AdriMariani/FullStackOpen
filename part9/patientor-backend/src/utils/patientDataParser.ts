import { Entry, Gender, NewPatient } from "../types";

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(param: any): param is Gender {
  return Object.values(Gender).includes(param);
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEntry(entry: any): entry is Entry {
  return entry.type && (entry.type === 'Hospital' || entry.type === 'OccupationalHealthcare' || entry.type === 'HealthCheck'); 
}

function parseStringParam(param: unknown, paramName: string): string {
  if (!param || !isString(param)) {
    throw new Error(`${paramName} is invalid or missing: ${param}`);
  }

  return param;
}

function parseGender(gender: unknown): Gender {
  if (!gender || !isGender(gender)) {
    throw new Error(`gender is invalid or missing: ${gender}`);
  }

  return gender;
}

function parseDateOfBirth(date: unknown): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`dateOfBirth is invalid or missing: ${date}`);
  }

  return date;
}

// @ts-ignore
function parseEntry(entry: unknown): Entry {
  if (!entry || !isEntry(entry)) {
    throw new Error(`entry is invalid or missing: ${entry}`);
  }

  return entry;
}

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

function toNewPatient({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient {
  const newPatient: NewPatient = {
    name: parseStringParam(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringParam(occupation, 'occupation'),
    entries: []
  };

  return newPatient;
}

export default toNewPatient;