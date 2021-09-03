interface CoursePart {
  name: string,
  exerciseCount: number
}

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return <>{courseParts.map(course => (
    <p key={course.name}>{course.name} {course.exerciseCount}</p>
  ))}</>;
}

export default Content;