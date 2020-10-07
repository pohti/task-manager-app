const sgMail = require('@sendgrid/mail')

const mymail = 'minmarnoo@gmail.com'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: mymail,
        subject: 'Thanks for joining our cult',
        text: `Welcome aboard, new user! ${name}`
    }) 
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: mymail,
        subject: 'We are sorry to see you go',
        text: `Bye bye ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}