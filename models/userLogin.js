const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/jwt")
const { secret } = require('../config/jwt')
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique : true   
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    
    maxlength: 11,
  },
  resetPasswordCode : {
    type : Number
  }
})

UserSchema.pre("save", function (next) {
  const user = this

  if (user.isModified('password')) {
    const salt = bcryptjs.genSaltSync(10)
    const hash = bcryptjs.hashSync(user.password, salt)

    user.password = hash
  }

  next()
})

UserSchema.methods.generateToken = function () {
  const user = this
  const { _id } = user
  const token = jwt.sign({ _id }, secret)
  return token
}


const Users = mongoose.model('Auth', UserSchema)
module.exports = Users