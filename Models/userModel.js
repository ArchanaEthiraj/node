const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    default: null
  }
})

const User = mongoose.model('User', user)

module.exports = User
