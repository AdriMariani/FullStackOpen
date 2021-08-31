import { Diagnose } from "../types";
import diagnosesData from '../../data/diagnoses.json';

const diagnoses: Diagnose[] = diagnosesData;

function getAllDiagnoses(): Diagnose[] {
  return diagnoses;
}

export default {
  getAllDiagnoses
};