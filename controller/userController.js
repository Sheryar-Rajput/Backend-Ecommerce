const Users = require('../models/userLogin')
const bcryptjs = require("bcryptjs");
const {passGenerator} = require('../utils/passwordGenerator')
const {sendEmail} = require('../utils/sendMail')
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

const forgetPassword = async(email)=>{
  const user = await Users.findOne({email})
  const code = passGenerator(6)
 if(!user){
  return 'no user exist'
 }
  const result = await sendEmail(user,code)
  // if(result){
  //   return {'message':"Mail sent!",result}  
  // }
   console.log('this is email result',result)
}
const newPassword = async(id,code,password)=>{
  const user = await Users.findOne({_id : id,resetPasswordCode : code})
  if(user){
    await Users.findByIdAndUpdate({_id : id},{password : password}) 
  }
  return 'password successfully change'
}
module.exports.userLogin = userLogin
module.exports.userSignUp = userSignUp
module.exports.changePasssword = changePasssword
module.exports.forgetPassword = forgetPassword
module.exports.newPassword = newPassword
