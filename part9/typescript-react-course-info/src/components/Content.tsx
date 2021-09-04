import Part from "./Part";
import { CoursePart } from "../types";

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return <>{courseParts.map(course => (
    <Part key={course.name} part={course}/>
  ))}</>;
}

export default Content;