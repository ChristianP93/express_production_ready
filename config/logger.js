const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  info: {
    colorize: false,
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    level: 'info',
    maxsize: 5242880,
    maxFiles: 5,
    json: true
  },
  error: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: true,
  },
  warn: {
    level: 'warn',
    name: 'file.warn',
    filename: `${appRoot}/logs/warn.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: true,
  },
  debug: {
    level: 'debug',
    name: 'file.debug',
    filename: `${appRoot}/logs/debug.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 100,
    colorize: true,
  },
  console: {
    colorize: true,
    handleExceptions: true,
    level: 'debug',
    json: false,
  },
};

const winstonLoggerApp    = winston.createLogger({
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

const winstonLoggerError  = winston.createLogger({
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});
const winstonLoggerWarn   = winston.createLogger({
  transports: [
    new winston.transports.File(options.warn),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});
const winstonLoggerDebug  = winston.createLogger({
  transports: [
    new winston.transports.File(options.debug),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});


const logger = {
    'info': (...arguments) => {
        return winstonLoggerApp.info(...arguments);
    },
    'debug': (...arguments) => {
        return winstonLoggerDebug.debug(...arguments);
    },
    'error': (...arguments) => {
        return winstonLoggerError.error(...arguments);
    },
    'warn': (...arguments) => {
        return winstonLoggerWarn.warn(...arguments);
    },
    'log': (...arguments) => {
        return winstonLoggerApp.log(...arguments);
    }
};

module.exports = logger
