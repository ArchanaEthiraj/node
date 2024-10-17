const mongoose = require('mongoose')

const employeeMarkSchema = new mongoose.Schema({
  tamil: {
    type: Number,
    required: true
  },
  english: {
    type: Number,
    required: true
  },
  maths: {
    type: Number,
    required: true
  },
  science: {
    type: Number,
    required: true
  },
  socialScience: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
})

const EmployeeMark = mongoose.model('EmployeeMark', employeeMarkSchema)

module.exports = EmployeeMark
