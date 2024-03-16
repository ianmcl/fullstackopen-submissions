import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handlePersonChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value })
  }

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObj))
      setNewPerson({ name: '', number: '' })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with <input value={filter} onChange={handleFilterChange} /></div>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>Name: <input name="name" value={newPerson.name} onChange={handlePersonChange} /></div>
          <div>Number: <input name="number" value={newPerson.number} onChange={handlePersonChange} /></div>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
