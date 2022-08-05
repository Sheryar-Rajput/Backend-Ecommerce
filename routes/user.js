const express = require('express')
const router = express.Router()
const Users = require('../models/userLogin')
const {userLogin} = require('../controller/userController')
const authorization = require('../config/verify')
router.post('/signup', async (req, res) => {
  try {
    const user = await Users.create(req.body)
  res.send(user)
  } catch (e) {
    res.send({ message: e })
  }
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const result = await userLogin(email,password)
  const {token,user} = result
  res.cookie("access_token", token, {
    httpOnly: true,
  })
  res
  .status(200)
  .json({user, message: "Logged in successfully " })

})

router.get('/logout',authorization,(req,res)=>{
 
  
    res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
  

  })
  

module.exports = router

