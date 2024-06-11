const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = (number) => {
  // European style: 09-1234556 or 040-22334455
  const europeanRegex = /^\d{2,3}-\d+$/
  // American style: (123) 456-7890, 123-456-7890, 123.456.7890
  const americanRegex = /^(?:\(\d{3}\)|\d{3}[.-]?)\d{3}[.-]?\d{4}$/
  return europeanRegex.test(number) || americanRegex.test(number)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3 // Minimum length constraint
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    minlength: 8,
    validate: {
      validator: phoneNumberValidator,
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
