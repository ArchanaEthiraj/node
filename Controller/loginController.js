const User = require('../Models/userModel')
const { encryptPayload, decryptPayload } = require('../middleware/logger')
const nodemailer = require('nodemailer')

// let transport = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'smtp.gmail.com',
//     pass: process.env.EMAIL_PASS
//   }
// })
// transport.verify((error, success) => {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('READY TO MESSAGE')
//     console.log(success)
//   }
// })

const getLogin = async (req, res) => {
  const { email, password } = req.body
  const encDec = req.query.encDec

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' })
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid Email or Password' })
    }

    const data = { message: 'Logged in Successfully', userId: user._id }

    if (encDec === '1') {
      const encryptedPayload = req.body.encryptedData
      if (!encryptedPayload) {
        return res.status(400).json({ message: 'Encrypted data is required' })
      }
      return res.json({
        data
      })
    } else {
      return res.json(encryptPayload(data))
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error occurred', error: error.message })
  }
}

const sendForgotOTP = async (req, res) => {
  try {
    const reqOtp = Math.floor(100000 + Math.random() * 900000)
    let id = req.body.userId

    let findEmail = await User.findById(id)
    console.log(reqOtp, 'reqOtp')
    if (findEmail) {
      // mailsend
      // const mailOptions = {
      //   from: process.env.EMAIL_USER,
      //   to: findEmail.email,
      //   subject: 'Forgot OTP'
      // }
      // transport.sendMail(mailOptions)
      let updateOtp = { otp: reqOtp }
      let updateData = await User.findByIdAndUpdate({ _id: id }, updateOtp)
      return res.status(200).json({ message: 'Mail send Successfully!', data: updateData })
    } else {
      return res.status(500).json({ message: 'Failed to send Mail', error: error })
    }
  } catch (error) {
    console.log(error, 'error')
    return res.status(500).json({ message: 'Failed to send Mail', error: error })
  }
}

const getForgot = async (req, res) => {
  try {
    let id = req.params.userId
    console.log('id', id)
    let dataOTP = req.body.otp
    console.log('dataOTP', dataOTP)
    let checkOTP = await User.findById(id)
    console.log('checkOTP', checkOTP)
    if (checkOTP) {
      if (parseInt(dataOTP) === parseInt(checkOTP.otp)) {
        return res.status(200).json({ message: 'Successfully Verified' })
      } else {
        return res.status(500).json({ message: 'Invalid OTP' })
      }
    } else {
      return res.status(500).json({ message: 'Invalid User' })
    }
  } catch (error) {
    console.log(error, 'error')
    return res.status(500).json({ message: 'OTP Failed', error: error })
  }
}

const getReset = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(403).json({ message: 'Password Required' })
    }
    let id = req.params.userId
    let updatePassword = req.body.password

    let updatedPass = { password: updatePassword }
    if (id) {
      let password = await User.findByIdAndUpdate({ _id: id }, updatedPass)
      return res.status(200).json({ message: 'Update Password Successfully!', password })
    } else {
      return res.status(500).json({ message: 'Unable to Update Password' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to Update Password', error: error })
  }
}

module.exports = { getLogin, getForgot, getReset, sendForgotOTP }
