/**
 * @fileOverview The code is a logger class that uses the Winston library to create loggers for different levels (info, warn, error). It also defines three static methods (log, warn, error) for logging messages. The loggers are configured to write to files with the specified filename and level.
 *
 * @module server/classes/winston
 * @requires winston
 * @exports module:server/classes/winston
 */
const winston = require('winston');

/**
 * @classdesc The code creates a logger using the winston library, which is used to log messages at different levels (info, warn, error). It also creates a LOG class with static methods for logging messages at each level. Finally, it exports the LOG class so it can be used in other modules.
 *
 * @constructor
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/childServer/info.log', level: 'info', options: { clear: true, tailable: true } }),
    new winston.transports.File({ filename: 'logs/childServer/warn.log', level: 'warn', options: { clear: true, tailable: true } }),
    new winston.transports.File({ filename: 'logs/childServer/error.log', level: 'error', options: { clear: true, tailable: true } })
  ]
});

/**
 *  @classDesc Provides easy access to the system bus and provides some helper methods for doing so
 */
class LOG {
  /**
  Logs a message
  @param {string} message - The message to log
  */
  static log(message) {
    logger.info(message);
  }

  /**
  Logs a warning message
  @param {string} message - The warning message to log
  */
  static warn(message) {
    logger.warn(message);
  }

  /**
  Logs an error message
  @param {string} message - The error message to log
  */
  static error(message) {
    logger.error(message);
  }
};

module.exports = LOG;
