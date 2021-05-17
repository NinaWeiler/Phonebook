//commands
//npm run dev <- nodemon

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express()

app.use(express.static('build'))

//cross-origin resource allows requests from other origins
app.use(cors())
app.use(express.json())


morgan.token('content', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :content'))


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
  

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
response.json(persons)
})

app.get('/info', (request, response) => {
    const amount = persons.length
    //console.log(persons.length)
    const now = new Date()

    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date}</p>`)
    //console.log(now)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).send('Contact not found')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(p => p.id !== id)
    response.status(204).end()
})

//id with Math.random
//error handling -> name or number missing
//name already exists
//{error: 'name must be unique'}

const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    return id
    
}

//add console logs
app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(body)

    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } 

    if(persons.find(p => p.name.toLowerCase()  === body.name.toLowerCase())) {
        return response.status(400).json({error: 'name must be unique'})
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
   
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
