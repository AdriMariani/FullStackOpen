import { EntryType } from "../types";
import { EntryFormValues } from "./AddEntryForm";

function validateForm(values: EntryFormValues) {
  const requiredError = "Field is required";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: { [field: string]: any } = {};
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.date) {
      errors.date = requiredError;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    
    switch(values.type) {
      case EntryType.HealthCheck: {
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        break;
      } case EntryType.Hospital: {
        if (!values.discharge.date) {
          errors.discharge = { date: requiredError }; 
        }
        if (!values.discharge.criteria) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors.discharge = { ...errors.discharge, criteria: requiredError};
        }
        break;
      } case EntryType.OccupationalHealthcare: {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
            if (!values.sickLeave.startDate) {
              errors.sickLeave = { startDate: "Must Specify Start Date" };
            }
            if (!values.sickLeave.endDate) {
              errors.sickLeave = { endDate: "Must Specify End Date" };
            }
          }
      }
    }

    return errors;
}

export default validateForm;