// const nodeMailer = require('nodemailer')

// const sendEmail = async(options) => {

//     const transporter = nodeMailer.createTransport({
//         service : process.env.SMTP_SERVICE,
//         auth : {
//             user : process.env.SMPT_MAIL,
//             pass : process.env.SMPT_PASSWORD
//         }
//     })

//     const mailOptions = {
//         from : process.env.SMPT_MAIL,
//         to : options.email,
//         subject : options.subject,
//         text : options.message
//     }

//     await transporter.sendMail(mailOptions)

// }

// module.exports = sendEmail

const nodemailer = require("nodemailer");

const sendEmail = async(options) => {

let transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            port:465,
            secure: true,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD, 
            },
            tls:{
                rejectUnAuthorized:true
            }
});

    var info = await transporter.sendMail({
        from : process.env.SMTP_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    });
// console.log(`Message Sent: ${info.messageId}`);
}

module.exports = sendEmail