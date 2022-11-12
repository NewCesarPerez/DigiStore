import nodemailer from "nodemailer";
import config from "../config/config.js";

//NODEMAILER

class NodeMailerClass {
  constructor(fromValue, toValue, subjectValue, htmlValue) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: config.ethereal.PORT,
      auth: {
        user: config.ethereal.EMAIL,
        pass: config.ethereal.PASSWORD,
      },
    });

    this.mailOptions = {
      from: fromValue,
      to: toValue,
      subject: subjectValue,
      html: htmlValue,
    };
  }

  sendEmail() {
    return this.transporter.sendMail(this.mailOptions);
  }
}

export default NodeMailerClass;
