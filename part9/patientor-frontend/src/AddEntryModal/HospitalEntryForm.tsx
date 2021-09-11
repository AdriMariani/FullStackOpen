import { Field } from "formik";
import React from "react";
import { TextField } from "../AddPatientModal/FormField";
import { EntryFormValues, FormProps } from "./AddEntryForm";
import BasicEntryForm from "./BasicEntryForm";

const HospitalEntryForm = ({ onSubmit, onCancel, onTypeChange, initialValues }: FormProps) => {
  const initialValuesHospital = {
    ...initialValues,
    discharge: {
      date: "",
      criteria: ""
    }
  } as EntryFormValues;

  return (
    <BasicEntryForm
      onCancel={onCancel}
      onTypeChange={onTypeChange}
      onSubmit={onSubmit}
      initialValues={initialValuesHospital}
    >
      <Field
        label="Discharge Date"
        placeholder="Date"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Discharge Criteria"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </BasicEntryForm>
  );
};

export default HospitalEntryForm;