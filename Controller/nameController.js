const Name = require('../Models/nameModel.js')

const addNamme = async (req, res) => {
  try {
    const { first_name, last_name } = req.body
    const newName = new Name({
      first_name,
      last_name
    })
    await newName.save()
    res.status(200).json({ message: 'Name Added Sucessfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}

const updateName = async (req, res) => {
  try {
    let id = req.params.id
    let updateName = req.body
    await Name.findByIdAndUpdate({ _id: id }, updateName, { new: true })
    res.status(200).json({ message: 'Updated Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error while Updating', error: error })
  }
}

const getName = async (req, res) => {
  try {
    console.log('req.params:', req.params)
    let id = req.params.id
    let data = await Name.findById({ _id: id })
    res.status(200).json({ message: 'User Data', data: data })
  } catch (error) {
    console.log('wvWE', error)
    res.status(500).json({ message: 'Error' })
  }
}

const deleteName = async (req, res) => {
  try {
    let id = req.params.id
    await Name.findByIdAndDelete({ _id: id }, { new: true })
    res.status(200).json({ message: 'Deleted Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Deleting the Name' })
  }
}

module.exports = { addNamme, updateName, getName, deleteName }
