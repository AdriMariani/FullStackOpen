import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addEntry, updatePatient, useStateValue } from "../state";
import { Button, Icon } from "semantic-ui-react";
import { Entry, EntryType, Gender, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryDisplay from "../components/EntryDisplay";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patientData));
      setIsLoading(false);
    };

    // if patient exists but patient's ssn doesn't exist, request patient data
    if (patients[id] && !patients[id].ssn) {
      void fetchPatient();
    } else {
      setIsLoading(false);
    }
  });

  const submitEntry = async (values: EntryFormValues) => {
    if (values.type === EntryType.OccupationalHealthcare && !values.sickLeave?.startDate) {
      values.sickLeave = undefined; // remove empty sickLeave
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const patient = patients[id];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!patient) {
    return <h2>404 Error: Patient Not Found</h2>;
  }

  const GenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Icon name='mars' />;
      case Gender.Female:
        return <Icon name='venus' />;
      case Gender.Other:
        return null;
      default:
        throw new Error(`Invalid Gender Value for Patient: ${JSON.stringify(patient)}`);
    }
  };

  return (
    <div>
      <h2>{patient.name} <GenderIcon /></h2>
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={() => closeModal()}
        error={error}
      />
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date Of Birth: {patient.dateOfBirth}</p>
      <h3>Entries</h3>
      <Button onClick={() => setModalOpen(true)}>Add Entry</Button>
      {
        patient.entries && patient.entries.length > 0 ?
        patient.entries.map(entry => <EntryDisplay key={entry.id} entry={entry}/>) :
        <p>No Entries to show for this patient.</p>
      }
    </div>
  );
};

export default PatientInfoPage;