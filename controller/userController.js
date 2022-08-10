const Users = require('../models/userLogin')
const bcryptjs = require("bcryptjs")

const userLogin = async (email, password) => {
  const user = await Users.findOne({ email }).select('-__v')
  const isAuthenticated = bcryptjs.compareSync(password, user.password);
  if (!isAuthenticated) {
    throw new Error('wrong password')
  }
  user.password = undefined;
  const token = await user.generateToken();
  return {
    token, user
  }
}

const userSignUp = async (name, email, password, phoneNumber) => {
  const verifyUser = await Users.findOne({ email })
  if (verifyUser) {
    return 'already exist'
  }
  const result = await Users.create({ name, email, password, phoneNumber })
  return result
}

const changePasssword = async (email, password, newPassword) => {
  const verifyUser = await Users.findOne({ email })
  if (!verifyUser) {
    return 'No User Exist'
  }
  const verifyPassword = bcryptjs.compareSync(password, verifyUser.password);
  if(!verifyPassword){
    return 'wrong password'
  }
  const result = Users.findOneAndUpdate({email : email},{ password :newPassword})
  return 'sucessfully Change'
}


module.exports.userLogin = userLogin
module.exports.userSignUp = userSignUp
module.exports.changePasssword = changePasssword

