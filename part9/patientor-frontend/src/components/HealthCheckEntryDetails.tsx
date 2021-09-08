import React from "react";
import { Icon } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const HeartIcon = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <Icon name="heart" color="green" />;
      case HealthCheckRating.LowRisk:
        return <Icon name="heart" color="yellow" />;
      case HealthCheckRating.HighRisk:
        return <Icon name="heart" color="orange" />;
      case HealthCheckRating.CriticalRisk:
        return <Icon name="heart" color="red" />;
      default:
        throw new Error(`Invalid health check rating: ${JSON.stringify(entry)}`);
    }
  };

  return <div><HeartIcon /></div>;
};

export default HealthCheckEntryDetails;