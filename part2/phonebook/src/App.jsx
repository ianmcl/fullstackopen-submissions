import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })

  const handlePersonChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  }

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    }
    else {
      const personObj = {
        name: newPerson.name,
        number: newPerson.number
      }

      setPersons(persons.concat(personObj))
      setNewPerson({ name: '', number: '' });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div><input name="name" value={newPerson.name} onChange={handlePersonChange} /></div>
          <div><input name="number" value={newPerson.number} onChange={handlePersonChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>

  )
}

export default App
