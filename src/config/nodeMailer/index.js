const nodemailer = require("nodemailer");
const config = require('../env')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.MAIL_USER, // generated gmail user
    pass: config.MAIL_PASS, // generated gmail password
  },
});

transporter.verify().then(()=>{
  console.log('Ready for send emails...');
})

module.exports = transporter;