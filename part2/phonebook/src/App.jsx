import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>Filter shown with <input value={filter} onChange={handleFilterChange} /></div>
  )
}

const PersonForm = ({ persons, setPersons, newPerson, setNewPerson, setNotification }) => {
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
            setNotification({ message: `Updated ${returnedPerson.name}`, type: 'success' })
            setTimeout(() => setNotification({ message: null, type: '' }), 5000)
          })
          .catch(error => {
            const errorMessage = error.response && error.response.data && error.response.data.error
              ? error.response.data.error
              : 'Unknown error'
            setNotification({ message: `Failed to update ${newPerson.name}: ${errorMessage}`, type: 'error' })
            setTimeout(() => setNotification({ message: null, type: '' }), 5000)
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
          setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
          setTimeout(() => setNotification({ message: null, type: '' }), 5000)
        })
        .catch(error => {
          const errorMessage = error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Unknown error'
          setNotification({ message: `Failed to add person: ${errorMessage}`, type: 'error' })
          setTimeout(() => setNotification({ message: null, type: '' }), 5000)
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


const Person = ({ person, setPersons, setNotification }) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deleteEntry(person.id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== person.id))
          setNotification({ message: `Deleted ${person.name}`, type: 'success' })
          setTimeout(() => setNotification({ message: null, type: '' }), 5000)
        })
        .catch(error => {
          const errorMessage = error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Unknown error'
          setNotification({ message: `Failed to delete ${person.name}: ${errorMessage}`, type: 'error' })
          setTimeout(() => setNotification({ message: null, type: '' }), 5000)
        })
    }
  }

  return (
    <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  )
}

const Persons = ({ persons, filter, setPersons, setNotification }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    filteredPersons.map(person =>
      <Person key={person.id} person={person} setPersons={setPersons} setNotification={setNotification} />
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Unknown error'
        setNotification({ message: `Failed to fetch persons: ${errorMessage}`, type: 'error' })
        setTimeout(() => setNotification({ message: null, type: '' }), 5000)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new contact</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )
}

export default App
