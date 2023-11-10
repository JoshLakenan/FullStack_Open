import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({ course }) => {
  console.log('Course')
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

export default Course