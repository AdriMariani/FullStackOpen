import { Diagnose, EntryType, NewEntry, HospitalEntry, HealthCheckRating, OccupationalHealthcareEntry } from "../types";
import { isString, parseDate, parseStringParam } from "./parserUtils";
import diagnosesService from '../services/diagnosesService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHealthCheckRating(rating: any): rating is HealthCheckRating {
  return Object.values(HealthCheckRating).includes(rating);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEntryType(type: any): type is EntryType {
  return Object.values(EntryType).includes(type);
}

function parseEntryType(type: unknown): EntryType {
  if (!type || !isEntryType(type)) {
    throw new Error(`entry type is invalid or missing: ${type}`);
  }

  return type;
}

function parseCode(code: unknown): Diagnose['code'] {
  if (!isString(code) || !diagnosesService.getAllDiagnoses().find(diagnosis => diagnosis.code === code)) {
    throw new Error(`Diagnosis code is invalid: ${code}`);
  }

  return code;
}

function parseDiagnosisCodes(codes: unknown): Array<Diagnose['code']> {
  if (!Array.isArray(codes)) {
    throw new Error('diagnosisCodes must be an array');
  }

  return codes.map(code => parseCode(code));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseHospitalDischarge(discharge: any): HospitalEntry['discharge'] {
  if (!discharge) {
    throw new Error(`discharge is missing: ${discharge}`);
  } else if (!discharge.date) {
    throw new Error(`discharge date is missing`);
  } else if (!discharge.criteria) {
    throw new Error(`discharge criteria missing`);
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseStringParam(discharge.criteria, 'criteria')
  };
}

function parseHealthCheckRating(rating: unknown): HealthCheckRating {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`healthCheckRating is missing or invalid: ${rating}`);
  }

  return rating;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSickLeave(sickLeave: any): OccupationalHealthcareEntry['sickLeave'] {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNewEntry(entry: any): NewEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newEntry: any = {
    type: parseEntryType(entry.type),
    description: parseStringParam(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseStringParam(entry.specialist, 'specialist'),
  };

  if (entry.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
  }

  switch(newEntry.type) {
    case EntryType.Hospital:
      newEntry.discharge = parseHospitalDischarge(entry.discharge);
      break;
    case EntryType.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheckRating(entry.healthCheckRating);
      break;
    case EntryType.OccupationalHealthcare: {
      newEntry.employerName = parseStringParam(entry.employerName, 'employerName');
      if (entry.sickLeave) {
        newEntry.sickLeave = parseSickLeave(entry.sickLeave);
      }
    }
  }

  return newEntry as NewEntry;
}

export default toNewEntry;