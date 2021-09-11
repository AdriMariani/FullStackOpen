import React from "react";
import { Field, Form, Formik } from "formik";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, SelectField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryType } from "../types";
import { EntryFormValues, FormProps } from "./AddEntryForm";
import validateForm from "./formValidator";

interface Props extends FormProps {
  children: React.ReactNode
  initialValues: EntryFormValues
}

const BasicEntryForm = ({
  onSubmit,
  onTypeChange,
  onCancel,
  children,
  initialValues
}: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateForm}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField 
              name="type"
              label="Type"
              options={Object.values(EntryType).map(value => ({ label: value, value }))}
              onChange={(e) => onTypeChange(e.target.value as EntryType)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            {children}  {/* for any additonal fields */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}    
    </Formik>
  );
};

export default BasicEntryForm;