import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";

// commented out as json file is no longer used
// // since gender is string in data and can't be assigned to enum Gender
// const patients: Patient[] = patientData.map(patient => {
//   const object = toNewPatient(patient) as Patient;
//   object.id = patient.id;
//   return object;
// });

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

function findPatientById(id: string): Patient | undefined {
  return patients.find(patient => patient.id === id);
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
  findPatientById,
  addPatient
};