import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>Filter shown with <input value={filter} onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({ persons, setPersons, newPerson, setNewPerson }) => {
  const addPerson = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number
      }

      phonebookService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewPerson({ name: '', number: '' })
        })
    }
  }

  const handlePersonChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>Name: <input name="name" value={newPerson.name} onChange={handlePersonChange} /></div>
        <div>Number: <input name="number" value={newPerson.number} onChange={handlePersonChange} /></div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    filteredPersons.map(person =>
      <Person key={person.id} person={person} />
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} newPerson={newPerson} setNewPerson={setNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
