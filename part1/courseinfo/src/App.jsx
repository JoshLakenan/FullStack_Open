const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.course.parts[0].name} exerciseCount={props.course.parts[0].exercises} />
      <Part name={props.course.parts[1].name} exerciseCount={props.course.parts[1].exercises} />
      <Part name={props.course.parts[2].name} exerciseCount={props.course.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  )
}

const Total = (props) => {

  const totalExerciseCount = props.course.parts.reduce((acc, curr) => acc + curr.exercises, 0)

  return (
    <p>Number of exercises {totalExerciseCount}</p>
  )
}
export default App