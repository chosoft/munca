const nodeMailer = require('nodemailer');
const { config } = require('./../../config/envVars')


function sendVerificationToken({token,email}){
    return new Promise(async (resolve,reject) => {
        try {
            let transporter = nodeMailer.createTransport({
                host: config.smtp,
                port: config.smtpPort,
                secure: false,
                auth:{
                    user: config.smtpUsername,
                    pass: config.smtpPassword
                }
            })
            let mailContent = await transporter.sendMail({
                from: " Mail Verification Worker <7934@colamer.edu.co>",
                to: email,
                subject: "Verification Mail",
                //Edit the html 
                html: `Verification <b>${token}</b>`
            })
            resolve('mailSend')
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = sendVerificationToken