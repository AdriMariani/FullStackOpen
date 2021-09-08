import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";

const EntryDisplay = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(code => <li key={`${entry.id}-${code}`}>{code} - {diagnoses[code].name}</li>)}
      </ul>
    </div>
  );
};

export default EntryDisplay;