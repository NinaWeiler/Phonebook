//commands
//npm run dev <- nodemon

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const Person = require('./models/person')


app.use(express.static('build'))
//cross-origin resource allows requests from other origins
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') { 
        return response.status(400).json({error: error.message})
  }
    next(error)
  }
  
morgan.token('content', (req,res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :content'))


/*
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
  
*/

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/info', (request, response) => {
    const now = new Date()
    Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> \n ${now}`)
    })
})

  
//GET persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
   
})

//DELETE person

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

// check for duplicates, server respond with approproate status code and error message

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    //console.log(body)

    /*
    if(!body.name || !body.number) {
        console.log('error: name or number missing')
        return response.status(400).json({
            error: 'name or number missing'
        })
    } 
    
    if(persons.find(p => p.name.toLowerCase()  === body.name.toLowerCase())) {
        return response.status(400).json({error: 'name must be unique'})
    } */
    
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))

    

    
    /*
    .catch(error => 
        console.log('error: name already exists in phonebook'),
        response.status(403).send({error: 'name already exists in phonebook'}))*/
   
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log('req.body', body)
    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
