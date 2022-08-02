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
  const { email, password } = req.body
  const result = await userLogin(email,password)
  // const user = await Users.findOne({ email })
  // if (!user) {
  //   return res.send({ message: 'No user found. Please register!' })
  // }
  // const isAuthenticated =  bcryptjs.compareSync(password, user.password, );
  // if (!isAuthenticated) {
  //   return res.send({ message: 'invalid password ' })
  // }
  // const token = await user.generateToken()
  // return (
  //   res.send({user, current_token : token})
  // )
})

router.post('/logout',async(req,res)=>{
 
   const result =  Users.statics.removeToken=(token)=>{
    const User = this;
    decoded = jwt.verify(token, secret)
  res
    //get query document
    //document.token fulan index
    //db.collection('users').doc(decoded._id).set({ tokens:  }, { merge: true })
  
    return User.findOneAndUpdate({ _id: decoded._id }, { $pull: { tokens: token } })
  }
  
})
module.exports = router

