const User = require('../Models/userModel')

const addUser = async (req, res) => {
  try {
    const { name, age, role, email, password } = req.body
    const newUser = new User({
      name,
      age,
      role,
      email,
      password
    })
    await newUser.save()
    res.status(200).json({ message: 'User Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding the User', error: error })
  }
}

const updateUser = async (req, res) => {
  try {
    let id = req.params.id
    let updateUser = req.body
    await User.findByIdAndUpdate({ _id: id }, updateUser, { new: true })
    res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Updating the User', error: error })
  }
}

const getUser = async (req, res) => {
  try {
    let id = req.params.id
    let getUser = req.body
    let data = await User.findById({ _id: id }, getUser, { new: true })
    res.status(200).json({ status: 200, data: data })
  } catch (error) {
    res.status(500).json({ message: 'Error getting the User', error: error })
  }
}

const deleteUser = async (req, res) => {
  try {
    let id = req.params.id
    await User.findByIdAndDelete({ _id: id }, { new: true })
    res.status(200).josn({ message: 'Deleted Successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error Deleting the User', error: error })
  }
}

const getLogin = async (req, res) => {
  let { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: 'Please provide email and password' })
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }
    res.json({ message: 'Logged in Successfully' })
  } catch (error) {
    res.status(500).json({ message: 'User Not Found', error: error })
  }
}

module.exports = { addUser, updateUser, getUser, deleteUser, getLogin }
