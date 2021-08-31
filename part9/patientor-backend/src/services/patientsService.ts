import { Patient, NonSensitivePatient, NewPatient } from "../types";
import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

function getAllPatients(): Patient[] {
  return patients;
}

function getAllNonSensitivePatients(): NonSensitivePatient[] {
  // make sure ssn is removed
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

function addPatient(patientData: NewPatient): Patient {
  const newPatient = {
    id: uuid(),
    ...patientData
  };
  patients.push(newPatient);
  return newPatient;
}

export default {
  getAllPatients,
  getAllNonSensitivePatients,
  addPatient
};