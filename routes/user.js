const express = require('express')
const router = express.Router()
const Users = require('../models/userLogin')
const bcryptjs = require("bcryptjs")
router.post('/signup', async (req, res) => {
  try {
    const user = await Users.create(req.body)

  res.send(user)
  } catch (e) {
    res.send({ message: e })
  }
})
router.post('/login', async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body.email_value
  const user = await Users.findOne({ email })
  if (!user) {
    return res.send({ message: 'No user found. Please register!' })
  }

  const isAuthenticated =  bcryptjs.compareSync(password, user.password, );
  if (!isAuthenticated) {
    return res.send({ message: 'invalid password ' })
  }

  const token = await user.generateToken()
  return (
    res.send({user, current_token : token})

  )


})

module.exports = router

