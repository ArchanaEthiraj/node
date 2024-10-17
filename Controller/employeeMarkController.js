const EmployeeMark = require('../Models/employeeMarkModel')
const Employee = require('../Models/employeeModel')

const addEmployeeMark = async (req, res) => {
  try {
    const { tamil, english, maths, science, socialScience, employeeId } = req.body

    if (!employeeId) {
      return res.status(400).json({ message: 'Employee ID is required.' })
    }

    const marks = [tamil, english, maths, science, socialScience]

    const total = marks.reduce((accumulator, current) => accumulator + current, 0)

    const newEmployeeMark = new EmployeeMark({
      employeeId,
      tamil,
      english,
      maths,
      science,
      socialScience,
      total
    })
    await newEmployeeMark.save()
    res.status(200).json({ message: 'Employee Mark Added Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Employee Mark', error: error })
  }
}

// const getEmployeeMarksWithDetails = async (req, res) => {
//   try {
//     let result = await EmployeeMark.find({}).populate('employeeId')
//     return res.status(200).json({ message: 'Data viewed', data: result })
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error: error })
//   }
// }

const getEmployeeMarksWithDetails = async (req, res) => {
  try {
    let result = await EmployeeMark.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employeeDetails'
        }
      }
    ])
    return res.status(200).json({ message: 'Data viewed', data: result })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'Internal Server Error', error: error })
  }
}


module.exports = { addEmployeeMark, getEmployeeMarksWithDetails }
