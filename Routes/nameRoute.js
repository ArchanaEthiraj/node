const express = require('express')
const { addNamme, updateName, getName, deleteName } = require('../Controller/nameController')
const { addUser, updateUser, getUser, deleteUser, getLogin } = require('../Controller/userController')
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

module.exports = router
