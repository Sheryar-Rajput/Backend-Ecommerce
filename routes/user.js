const express = require('express')
const router = express.Router()
const Users = require('../models/userLogin')
const { userLogin, userSignUp,changePasssword,forgetPassword,newPassword } = require('../controller/userController')
const authorization = require('../config/verify')
const { use } = require('../utils/caughterror')
const {passGenerator} = require('../utils/passwordGenerator')
const {sendEmail} = require('../utils/sendMail')
router.post('/signup', use(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body
  const result = await userSignUp(name, email, password, phoneNumber)
    .catch(err => {
      throw new Error(err)
    })
  res.json(result)
}))

router.post('/login', use(async (req, res) => {
  const { email, password } = req.body
  const result = await userLogin(email, password).catch(err => {
    throw new Error(err)
  })
  const { token, user } = result
  res.cookie("access_token", token, {
    httpOnly: true,
  })
  res
    .status(200)
    .json({ user, message: "Logged in successfully " })

}))

router.put('/changePassword',use(async(req,res)=>{
const {email,password,newPassword} = req.body
const result = await changePasssword(email,password,newPassword)
.catch(err => {
  throw new Error(err)
})
res.json(result)

}))

router.post('/forgetPassword',use(async(req,res)=>{
  const {email} = req.body 
  const user = await forgetPassword(email).catch(err => {
    throw new Error(err.message)
  })
  if(user){
   let code = passGenerator(6)
    let mail = await sendEmail(user,code).catch(err=>{
      throw new Error (err.message)
    })

  }
  
  res.json('error')
  
}))

router.post('/newPassword/:id/:code',use(async(req,res)=>{
  const {id,code} = req.params
  const {password} = req.body
  const result = await newPassword(id,code,password) .catch(err => {
    throw new Error(err)
  })
  res.json(result)
}))

router.get('/logout', authorization, (req, res) => {
  res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
})


module.exports = router

