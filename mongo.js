const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

//accessing command line parameter process.argv
const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

const url =
  `mongodb+srv://phonebook-admin:${password}@cluster0.m0jnx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const Person = mongoose.model('Person', personSchema)


//saving data to collection
const person = new Person({
    name: name,
    number: number,
  })


if (!name) {
    Person
    .find({})
    .then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()    
    })
    
} else {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      }) 
}




/*
//listing stored data
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
}) */