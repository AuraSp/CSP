

const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});
const now = new Date();
const logger = winston.createLogger({
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(({
      level,
      message
    }) => `${level}: ${message}, ${now}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    })
  ]
});

module.exports = logger;
