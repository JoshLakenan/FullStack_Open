const Total = ({ parts }) => {

  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0)

  return (
    <p>Total number of exercises {total}</p>
  )
}

export default Total