import nodemailer from 'nodemailer';
const notifier = require('node-notifier');

export const prepareMail = (alert) => {
    const {id, threshold, currency, crypto} = alert[0];

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lucien.ladurie@gmail.com',
          pass: process.env.EMAIL_PASS,
        }
      });
    const mailOptions = {
        from: 'lucien.ladurie@gmail.com',
        to: 'lucien.ladurie@gmail.com',
        subject: 'new alert detected',
        text: `Une alerte pour cette étude a étée relevée :${threshold} ${currency} on ${crypto}`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export const notification = (alert) => {
    notifier.notify(
        {
          title: 'Threshold Reached',
          message: `Hello, ${alert[0].crypto} has hit the value of ${alert[0].alertedAt} ${alert[0].currency}`,
          sound: true, // Only Notification Center or Windows Toasters
          timeout: 10,
        },
        function(err, response) {
          console.log(response);
        }
      );
}