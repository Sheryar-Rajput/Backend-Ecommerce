const express = require('express')
const router = express.Router()
const Users = require('../models/userLogin')
const { userLogin, userSignUp,changePasssword } = require('../controller/userController')
const authorization = require('../config/verify')
const { use } = require('../utils/caughterror')

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

router.get('/logout', authorization, (req, res) => {
  res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
})


module.exports = router

