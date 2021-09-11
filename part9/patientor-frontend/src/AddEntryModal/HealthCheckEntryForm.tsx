import { Field } from "formik";
import React from "react";
import { NumberField } from "../AddPatientModal/FormField";
import { HealthCheckRating } from "../types";
import { EntryFormValues, FormProps } from "./AddEntryForm";
import BasicEntryForm from "./BasicEntryForm";

const HealthCheckEntryForm = ({ onSubmit, onCancel, onTypeChange, initialValues }: FormProps) => {
  const initialValuesHealthCheck = {
    ...initialValues,
    healthCheckRating: HealthCheckRating.Healthy
  } as EntryFormValues;

  return (
    <BasicEntryForm
      onCancel={onCancel}
      onTypeChange={onTypeChange}
      onSubmit={onSubmit}
      initialValues={initialValuesHealthCheck}
    >
      <Field
        name="healthCheckRating"
        label="Health Rating"
        component={NumberField}
        min={0}
        max={3}
      />
    </BasicEntryForm>
  );
};

export default HealthCheckEntryForm;