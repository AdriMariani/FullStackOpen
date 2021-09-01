import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/patientDataParser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientsService.addPatient(toNewPatient(req.body));
    res.json(newPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;