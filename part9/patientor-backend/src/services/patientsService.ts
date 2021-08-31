import { Patient, NonSensitivePatient } from "../types";
import patientData from '../../data/patients.json';

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

export default {
  getAllPatients,
  getAllNonSensitivePatients
};