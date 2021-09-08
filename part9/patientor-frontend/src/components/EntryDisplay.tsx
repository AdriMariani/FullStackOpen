import React from "react";
import { Entry } from "../types";

const EntryDisplay = ({ entry }: { entry: Entry }) => {
  return (
    <div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map(code => <li key={`${entry.id}-${code}`}>{code}</li>)}
      </ul>
    </div>
  );
};

export default EntryDisplay;