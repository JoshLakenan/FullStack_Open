import { useState, useEffect } from 'react'
import db from './services/db.js'
import Form from './components/Form.jsx'
import Contacts from './components/Contacts.jsx'
import Filter from './components/Filter.jsx'
import FlashMessage from './components/FlashMessage.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [flashMessage, setFlashMessage] = useState(null)

  useEffect(() => {
    db.getAll().then((persons) => setPersons(persons))
  }, [])

  const flash = (message) => {
    setFlashMessage(message)
    setTimeout(setFlashMessage.bind(null, null), 2000)
  }

  const reset = () => {
    setNewName('')
    setNewNumber('')
  }

  const dbError = () => {
    const message = `Information of ${newName} has already been removed from the server. Please refresh the page.`
    flash({text: message, status: 'error'})
    reset()
  }

  const submitHandler = (event) => {
    event.preventDefault()

    let operation;

    if (persons.find(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        const updatedPerson = {name: newName, number: newNumber, id}
        operation = `Updated phone number for ${newName}.`

        db
          .update(id, updatedPerson)
          .then(responsePerson => {
            setPersons(persons.map(person => {
              return person.id === responsePerson.id
                ? responsePerson
                : person
            }))
            reset()
          })
          .catch(dbError)
      }
    } else {
      operation = `Added ${newName}.`
      db
        .create({name: newName, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          reset()
        })
    }

    flash({text: operation, status: 'success'})
  }

  const deleteHandler = person => {
    return () => {
      if (confirm(`Delete ${person.name}?`)) {
        db.deletePerson(person.id).then(() => console.log(`${person.name} deleted.`))

        setPersons(persons.filter(old => old.id !== person.id))
        flash({text: `${person.name} deleted.`, status: 'success'})
      }
    }
  }

  const nameHandler = (event) => setNewName(event.target.value)
  const numberHandler = (event) => setNewNumber(event.target.value)
  const searchHandler = (event) => setSearch(event.target.value)

  const showPersons = search
    ? persons.filter(person => new RegExp(search, 'i').test(person.name))
    : persons

  const data = {
    persons: showPersons,
    newName,
    newNumber,
    search,
    nameHandler,
    numberHandler,
    submitHandler,
    searchHandler,
    deleteHandler
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <FlashMessage message={flashMessage} />
      <Filter data={data}/>
      <h2>Add a new Number</h2>
      <Form data={data}/>
      <h2>Numbers</h2>
      <Contacts data={data}/>
    </div>
  )
}

export default App
