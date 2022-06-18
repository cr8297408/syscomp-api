const transporter = require('../../config/nodeMailer')

async function sendMail(from, emailFrom, emailTo, subject, html){
  let info = await transporter.sendMail({
    from: `${from} <${emailFrom}>`, // sender address
    to: emailTo, // list of receivers
    subject: subject, // Subject line
    html: html, // body
  });
}

module.exports = sendMail;