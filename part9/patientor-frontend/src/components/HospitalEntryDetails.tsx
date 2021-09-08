import React from "react";
import { HospitalEntry } from "../types";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>Discharge Date: {entry.discharge.date}</p>
      <p>Discharge Criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntryDetails;