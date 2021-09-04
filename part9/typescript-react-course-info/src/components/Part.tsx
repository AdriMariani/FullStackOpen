import { CoursePart } from "../types";

function Part({ part }: { part: CoursePart }) {
  const details = [
    <li>Type: {part.type}</li>,
    <li>Exercise Count: {part.exerciseCount}</li>
  ];

  switch (part.type) {
    case "normal":
      details.push(<li>Description: <i>{part.description}</i></li>);
      break;
    case "groupProject":
      details.push(<li>Group Project Count: {part.groupProjectCount}</li>);
      break;
    case "submission":
      details.push(<li>Description: <i>{part.description}</i></li>);
      details.push(<li>Exercise Submission Link: {part.exerciseSubmissionLink}</li>);
      break;
    case "special":
      details.push(<li>Description: <i>{part.description}</i></li>);
      details.push(<li>Requirements: {part.requirements.join(", ")}</li>);
      break;
    default:
      return <p>Invalid Course Part</p>;
  }

  return (
    <div>
      <p><b>{part.name}</b></p>
      <ul>
        {details}
      </ul>
    </div>
  );
}

export default Part;