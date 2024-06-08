const express = require('express')
const app = express()

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numberOfEntries = persons.length
  const requestTime = new Date()
  response.send(
    `<p>Phonebook has info for ${numberOfEntries} people</p><p>${requestTime}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'person not found' })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const initialLength = persons.length
  persons = persons.filter(person => person.id !== id)

  if (persons.length < initialLength) {
    response.status(204).end() // 204 No Content
  } else {
    response.status(404).json({ error: 'person not found' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
