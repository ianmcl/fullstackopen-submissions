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

    const existingPerson = persons.find(person => person.name === newPerson.name)
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPerson.number }
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewPerson({ name: '', number: '' })
          })
          .catch(error => {
            console.error('Failed to update person:', error)
            alert(`Failed to update ${newPerson.name}, please try again later`)
          })
      }
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
        .catch(error => {
          console.error('Failed to add person:', error)
          alert('Failed to add person, please try again later')
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

const Person = ({ person, setPersons }) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deleteEntry(person.id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.error('Failed to delete person:', error)
          alert(`Failed to delete ${person.name}, please try again later`)
        })
    }
  }

  return (
    <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  )
}

const Persons = ({ persons, filter, setPersons }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    filteredPersons.map(person =>
      <Person key={person.id} person={person} setPersons={setPersons} />
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
      .catch(error => {
        console.error('Failed to fetch persons:', error)
        alert('Failed to fetch persons, please try again later')
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} newPerson={newPerson} setNewPerson={setNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App
