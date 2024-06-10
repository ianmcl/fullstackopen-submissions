const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// Middleware setup
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('req-body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

// Data storage
let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
]

// Routes
app.get('/api/persons', (req, res) => res.json(persons))

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === Number(req.params.id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const initialLength = persons.length
  persons = persons.filter(person => person.id !== id)
  persons.length < initialLength ? res.status(204).end() : res.status(404).json({ error: 'person not found' })
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  if (persons.some(person => person.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const newPerson = { id: Math.floor(Math.random() * 1000000), name, number }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

// Server setup
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
