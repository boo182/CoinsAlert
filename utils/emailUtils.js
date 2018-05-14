import nodemailer from 'nodemailer';
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