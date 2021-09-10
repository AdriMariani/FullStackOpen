import { Gender, NewPatient } from "../types";
import { parseStringParam, parseDate } from './parserUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGender(param: any): param is Gender {
  return Object.values(Gender).includes(param);
}

function parseGender(gender: unknown): Gender {
  if (!gender || !isGender(gender)) {
    throw new Error(`gender is invalid or missing: ${gender}`);
  }

  return gender;
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
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringParam(occupation, 'occupation'),
    entries: []
  };

  return newPatient;
}

export default toNewPatient;