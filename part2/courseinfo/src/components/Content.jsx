import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part part={part} key={part.id}/>)}
      <Total parts={parts}/>
    </>
  )
}

export default Content