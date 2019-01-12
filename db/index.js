const mongoose      = require('mongoose');
const chalk         = require('chalk');
const connected     = chalk.bold.green;
const error         = chalk.bold.yellow;
const disconnected  = chalk.bold.red;
const termination   = chalk.bold.magenta;
const DBCON         = require('./db_connection');
const sendMail      = require('../helpers').sendmail

mongoose.connect(DBCON, { useNewUrlParser: true });

if(process.env.NODE_ENV === 'production'){
  mongoose.connection.on('connected', async()=>{
    console.log(connected("Mongoose default connection is open to ", DBCON));
    let message = {
      status: "connected"
    }
    // await sendMail(false, message)
  });

  mongoose.connection.on('error', async(err)=>{
    console.log(error(`Mongoose default connection has occured ${err} error`));
    let type_error = {
      errorType: 'error',
      status: 'Error'
    }
    await sendMail(true, type_error)
    return
  });

  mongoose.connection.on('disconnected', async()=>{
    console.log(disconnected("Mongoose default connection is disconnected"));
    let type_error = {
      errorType: 'Fatal Error',
      status: 'disconnected'
    }
    await sendMail(true, type_error)
    return
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(async()=>{
      console.log(termination("Mongoose default connection is disconnected due to application termination"));
      let type_error = {
        errorType: 'Fatal Error',
        status: 'SIGINT'
      }
      await sendMail(true, type_error)
      return
    });
  });
}


module.exports = mongoose
