const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("./config/smtp");

async function sendEmail(email, subject, text, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_CONFIG.user, // generated ethereal user
      pass: SMTP_CONFIG.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'NAZOMA <nazoma.ecommerce@gmail.com>', 
    to: email, 
    subject: subject, 
    text: text, 
    html: template
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.sendEmail = sendEmail