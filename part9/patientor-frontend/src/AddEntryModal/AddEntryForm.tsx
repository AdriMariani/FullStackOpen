import React, { useState } from "react";
import { Entry, EntryType, UnionOmit } from "../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OCEntryForm from "./OHEntryForm";

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export interface FormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  onTypeChange: (type: EntryType) => void;
  initialValues: Omit<Entry, 'id'>
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType]  = useState<EntryType>(EntryType.HealthCheck);

  const onTypeChange = (newType: EntryType) => setType(newType);

  const initialValues = {
    type,
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };

  const EntryForm = () => {
    switch (type) {
      case EntryType.HealthCheck:
        return <HealthCheckEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          onTypeChange={onTypeChange}
          initialValues={initialValues}
        />;
      case EntryType.Hospital:
        return <HospitalEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          onTypeChange={onTypeChange}
          initialValues={initialValues}
        />;
      case EntryType.OccupationalHealthcare:
        return <OCEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          onTypeChange={onTypeChange}
          initialValues={initialValues}
        />;
      default:
        return null;
    }
  };

  return (
    <EntryForm />
  );
};

export default AddEntryForm;