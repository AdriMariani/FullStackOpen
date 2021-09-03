import { Gender, NewPatient } from "../types";

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
    occupation: parseStringParam(occupation, 'occupation')
  };

  return newPatient;
}

export default toNewPatient;