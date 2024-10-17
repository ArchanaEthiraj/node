const Employee = require('../Models/employeeModel')
const moment = require('moment')

const addEmployee = async (req, res) => {
  try {
    const { name, dateOfBirth, email, phone, role, isActive, isDeleted } = req.body

    const passDOB = moment(dateOfBirth, 'YYYY-MM-DD', true)

    if (!passDOB) {
      return res.status(400).json({ message: 'Invalid Date Format, Please use MM-DD-YYYY' })
    }

    const newEmployee = new Employee({
      name,
      dateOfBirth: passDOB.toDate(),
      email,
      phone,
      role,
      isActive,
      isDeleted
    })
    await newEmployee.save()
    res.status(200).json({ message: 'Employee Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Employee', error: error })
  }
}

const updateEmployee = async (req, res) => {
  try {
    let id = req.params.id
    let updateEmp = req.body
    await Employee.findByIdAndUpdate({ _id: id }, updateEmp)
    res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getByIdEmployee = async (req, res) => {
  try {
    let id = req.params.id
    let data = await Employee.findById({ _id: id })
    res.status(200).json({ message: 'Employee Data', data: data })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const deleteEmployee = async (req, res) => {
  try {
    let id = req.params.id
    await Employee.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Error', error: error })
  }
}

const getAllEmployee = async (req, res) => {
  try {
    let data = await Employee.find()
    res.status(200).json({ message: 'Listed Successfully!', data: data })
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error })
  }
}

module.exports = { addEmployee, updateEmployee, getByIdEmployee, deleteEmployee, getAllEmployee }
