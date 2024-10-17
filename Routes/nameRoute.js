const express = require('express')
const { addNamme, updateName, getName, deleteName } = require('../Controller/nameController')
const { addUser, updateUser, getUser, deleteUser } = require('../Controller/userController')
const { getLogin, getForgot, getReset, sendForgotOTP } = require('../Controller/loginController')
const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
  getByIdEmployee
} = require('../Controller/employeeController')
const { getEmployeeMarksWithDetails, addEmployeeMark } = require('../Controller/employeeMarkController')
const router = express.Router()

router.post('/name', addNamme)
router.put('/name/:id', updateName)
router.get('/name/detail/:id', getName)
router.delete('/name/:id', deleteName)

router.post('/user', addUser)
router.put('/user/:id', updateUser)
router.get('/user/detail/:id', getUser)
router.delete('/user/:id', deleteUser)

router.post('/login', getLogin)
router.post('/forgot-password/:userId', getForgot)
router.post('/reset-password/:userId', getReset)
router.post('/send-otp', sendForgotOTP)

router.post('/employee', addEmployee)
router.put('/employee/:id', updateEmployee)
router.delete('/employee/:id', deleteEmployee)
router.get('/employee', getAllEmployee)
router.get('/employee/detail/:id', getByIdEmployee)

router.post('/employee-mark', addEmployeeMark)
router.get('/employee-detail', getEmployeeMarksWithDetails)

module.exports = router
