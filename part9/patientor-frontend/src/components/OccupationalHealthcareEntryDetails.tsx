import React from "react";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave ? <p>Sick Leave: {`${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}</p> : null}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;