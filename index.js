//commands
//npm run dev <- nodemon

const { request } = require('express')
const express = require('express')
const app = express()


let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      
    ]
  



// Phonebook has info for x people
//Time of processing request

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
response.json(persons)
})

app.get('/info', (request, response) => {
    const amount = persons.length
    console.log(persons.length)
    const now = new Date()

    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
    console.log(now)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)