/**
 * @module server/TelegramBot
 * @requires server/classes/winston
 * @requires server/TelegramBot/telegraf
 * @desc Contains all bot hears
 */
const LOG = require('../classes/winston');

/**

@desc This file imports all functions from ./actions, ./hears and ./commands
*/
const bot = require('./telegraf');

/**
@function
@description Imports all the functions from ./actions
@param {module:server/TelegramBot/telegraf} bot Bot object created in telegraf
*/
require('./actions')(bot);

/**
@function
@description Imports all the functions from ./hears
@param {module:server/TelegramBot/telegraf} bot Bot object created in telegraf
*/
require('./hears')(bot);

/**
@function
@description Imports all the functions from ./commands
@param {module:server/TelegramBot/telegraf} bot Bot object created in telegraf
*/
require('./commands')(bot);

/**
 * Launches the bot
 * @function
 * @param {Object} ctx The context object for the bot
 */
bot.launch().catch(error => {
  if (error.code === 401) {
    bot.context = 99;
  } else {
    bot.context = 0;
  }
  LOG.error({ error: error.message || error });
});

module.exports = bot;
