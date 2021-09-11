import express from 'express';
import patientsService from '../services/patientsService';
import toNewEntry from '../utils/entryDataParser';
import toNewPatient from '../utils/patientDataParser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAllNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);

  if (!patient) {
    res.sendStatus(404);
  } else {
    res.json(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientsService.addPatient(toNewPatient(req.body));
    res.json(newPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = patientsService.addEntry(id, toNewEntry(req.body));
    res.json(newEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: e.message });
    }
  }
});

export default router;