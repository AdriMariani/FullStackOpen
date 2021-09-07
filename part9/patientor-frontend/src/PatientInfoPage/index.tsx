import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import { Gender, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({
        type: 'UPDATE_PATIENT',
        payload: patientData
      });
      setIsLoading(false);
    };

    // if patient exists but patient's ssn doesn't exist, request patient data
    if (patients[id] && !patients[id].ssn) {
      void fetchPatient();
    } else {
      setIsLoading(false);
    }
  });

  const patient = patients[id];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!patient) {
    return <h2>404 Error: Patient Not Found</h2>;
  }

  const GenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Icon name='mars' />;
      case Gender.Female:
        return <Icon name='venus' />;
      case Gender.Other:
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{patient.name} <GenderIcon /></h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date Of Birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientInfoPage;