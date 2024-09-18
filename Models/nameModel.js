const mongoose = require('mongoose')

const nameSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  }
})

const Name = mongoose.model('Name', nameSchema)

module.exports = Name
