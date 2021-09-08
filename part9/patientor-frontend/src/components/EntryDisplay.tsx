import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

const EntryDisplay = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const EntryIcon = () => {
    switch (entry.type) {
      case "Hospital":
        return <Icon name="hospital" size="large"/>;
      case "HealthCheck":
        return <Icon name="doctor" size="large"/>;
      case "OccupationalHealthcare":
        return <Icon name="stethoscope" size="large"/>;
      default:
        throw new Error(`Invalid Entry type: ${JSON.stringify(entry)}`);
    }
  };

  const EntryDetails = () => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      default:
        throw new Error(`Invalid Entry type: ${JSON.stringify(entry)}`);
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <EntryIcon /></Card.Header>
        <Card.Description><i>{entry.description}</i></Card.Description>
        <br />
        <EntryDetails />
        <ul>
          {entry.diagnosisCodes?.map(code => <li key={`${entry.id}-${code}`}>{code} - {diagnoses[code].name}</li>)}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default EntryDisplay;