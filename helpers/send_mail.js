var nodemailer = require('nodemailer');

module.exports = function(isError, error){
  return new Promise((resolve, reject) =>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_server@mail.com',
        pass: 'secret_mail_pwd'
      }
    });

    let mailOptions = {
      from: 'your_server@mail.com',
      to: 'your@mail.com',
      text: `status: ${error.status},
      date :  ${new Date().getTime()}`
    }
    switch (isError) {
      case true:
        mailOptions.subject = 'FATAL ERROR ON SERVER MONGODB';
        break;

      case 'WARNING':
        mailOptions.subject = 'WARNING ON SERVER MONGODB';
        break;

      default:
        mailOptions.subject = 'Default statement';
        break;
    }
    console.log(mailOptions);

    return transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        throw error
        return reject(error)
      }
      console.log('Email sent: ' + info.response);
      return resolve();
    });
  })
}
