const Contacts = ({ data }) => {
  return (
    <>
      {data.persons.map(person => {

        console.log(data.persons)
        return (
          <p key={person.id}>
            {person.name} - {person.number}
            <button onClick={data.deleteHandler(person)}>Delete</button>
          </p>
        )
      })}
    </>
  )
}

export default Contacts