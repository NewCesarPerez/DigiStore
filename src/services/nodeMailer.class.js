import nodemailer from 'nodemailer'
import config from "../config/config.js";

//NODEMAILER
let instance=null;
class NodeMailerClass {
    constructor(fromValue,toValue, subjectValue, htmlValue){
        this.transporter=nodemailer.createTransport({
            host: 'smtp.ethereal.email',
              port: process.env.MAX_AGE_HEROKU||config.ethereal.PORT,
              auth: {
                  user: process.env.ETHEREAL_EMAIL_HEROKU||config.ethereal.EMAIL,
                  pass: process.env.ETHEREAL_PASSWORD_HEROKU||config.ethereal.PASSWORD
              }
          })

        this. mailOptions={
        
            from:fromValue,
            to:toValue,
            subject:subjectValue,
            html:htmlValue
          }
    }
    
    sendEmail (){
     
        return this.transporter.sendMail(this.mailOptions)
    }
}

export default NodeMailerClass

  