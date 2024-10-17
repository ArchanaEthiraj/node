const mongoose = require('mongoose')

const employee = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Employee = mongoose.model('Employee', employee)

module.exports = Employee
