const nodemailer = require('nodemailer');


const sendEmail = async(user,code )=>{
    const {email,_id} = user
    console.log("---->",email,_id)
    // const senderEmail = "tempmailfor6pp@gmail.com"
    // const pass = "pleasesubscribetomychannel"
    const transporter =  nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "tempmailfor6pp@gmail.com",
            pass : "pleasesubscribetomychannel"
        },
       
    })
    
    // "sheryarrajput47@gmail.com"
    const options = {
        from : "tempmailfor6pp@gmail.com",
        to :  "sheryarrajput47@gmail.com",
        subject : 'e-commerce recover code ',
        text : `Your password reset code: ${code}\nDo not share with anyone else!\n\nValid for 2 minutes only.`
    }
     await transporter.sendMail(options , (error , info)=>{
        if(error){
            console.log(error.message)
        }
        else {
            console.log('Email sent: ' + info.response);
          }

    })
    return _id

}


module.exports.sendEmail = sendEmail;