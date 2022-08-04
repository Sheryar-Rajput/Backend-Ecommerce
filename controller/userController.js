const Users = require('../models/userLogin')
const bcryptjs = require("bcryptjs")


const userLogin = async(email,password)=>{
    const user = await Users.findOne({ email })
 if (!user) {
    return res.send({ message: 'No user found. Please register!' })
  }
  const isAuthenticated =  bcryptjs.compareSync(password, user.password, );
  if (!isAuthenticated) {
    return res.send({ message: 'invalid password ' })
  }
  const token = await user.generateToken()
  return { token,user
  }
}

const userlogout = async()=>{

} 
module.exports.userLogin = userLogin
module.exports.userlogout = userlogout

