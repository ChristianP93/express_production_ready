const dotenv = require('dotenv').load();

module.exports = (()=>{
  let DB_CONNECTION
  if(!process.env.NODE_ENV )                    process.env.NODE_ENV = 'development';
  if(process.env.NODE_ENV === 'production')     DB_CONNECTION = dotenv.parsed.PROD;
  if(process.env.NODE_ENV === 'development')    DB_CONNECTION = dotenv.parsed.DEV;
  if(process.env.NODE_ENV === 'test')           DB_CONNECTION = dotenv.parsed.TEST;
  return DB_CONNECTION
})();
