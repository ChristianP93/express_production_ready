const cluster = require('cluster');

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal){
    cluster.fork();
  });

} else {
  const express     = require('express');
  const app         = express();
  const fs          = require('fs');
  const cors        = require("cors");
  const path        = require('path');
  const chalk       = require('chalk');
  const connected   = chalk.bold.green;
  const compression = require('compression')
  const bodyParser  = require('body-parser');
  const https       = require("https");
  const helmet      = require("helmet");
  const morgan      = require('morgan');

  const mongoose    = require('./db');
  const winston     = require('./config').logger;

  const PORT        = process.env.PORT || 3000

  app.use(morgan('combined', { stream: winston.stream }));
  app.use(helmet());
  app.use(cors({
    origin: [`http://localhost:8080${PORT}`],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

  app.use(compression())

  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json({limit: '5mb'}));

  // middleware

  // api
  app.get('/',function(req, res){
    let err = {message: 'message'}
    // winston.error(`${err.status || 500} - 'error' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // winston.debug(`${err.status || 500} - 'debug' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // winston.warn(`${err.status || 500} - 'warn' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // winston.info(`${err.status || 500} - 'info' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(200).send('hello world')
  });

  const server = app.listen(PORT, function(){
    console.log(connected(`server express start on: http://localhost: ${PORT}`));
  })

  module.exports = app;
}
