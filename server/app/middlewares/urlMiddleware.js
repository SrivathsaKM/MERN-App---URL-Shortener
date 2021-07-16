const moment = require('moment');


const getStats = (req, res, next) => {
  const clickDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  const ipAddress = `${req.ip}`;
  const browser = `${req.useragent.browser}`;
  const os = `${req.useragent.os}`;
  const platform = `${req.useragent.platform}`;
  const device = `Window =  '${req.useragent.isWindows}' , Phone =  '${req.useragent.isMobile}'`;
  const stats = {
      clickDateTime,
      ipAddress,
      browser,
      os,
      platform,
      device
  }
   req.stats = stats 
  next()
}




// es6 concise property 
module.exports = {
    getStats
}