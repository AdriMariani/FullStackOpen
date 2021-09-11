import { Field } from "formik";
import React from "react";
import { TextField } from "../AddPatientModal/FormField";
import { EntryFormValues, FormProps } from "./AddEntryForm";
import BasicEntryForm from "./BasicEntryForm";

const OHEntryForm = ({ onSubmit, onCancel, onTypeChange, initialValues }: FormProps) => {
  const initialValuesOH = {
   ...initialValues,
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: ""
    }
  } as EntryFormValues;

  return (
    <BasicEntryForm
      onCancel={onCancel}
      onTypeChange={onTypeChange}
      onSubmit={onSubmit}
      initialValues={initialValuesOH}
    >
      <Field
        label="Employer Name"
        placeholder="Employer"
        name="employerName"
        component={TextField}
      />
      <Field
        label="Sick Leave Start Date"
        placeholder="Date"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick Leave End Date"
        placeholder="Date"
        name="sickLeave.endDate"
        component={TextField}
      />
    </BasicEntryForm>
  );
};

export default OHEntryForm;