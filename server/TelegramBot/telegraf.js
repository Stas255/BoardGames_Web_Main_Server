/**
 * @module server/TelegramBot/telegraf
 * @requires telegraf
 * @desc This module defines a Telegraf bot and launches it.
 */
const { Telegraf, session } = require('telegraf');

/**
The Telegraf bot instance.
@type {Telegraf}
*/
const bot = new Telegraf(process.env.BOT_TOKEN);

// Use the session middleware
bot.use(session());

// SIGINT and SIGTERM signal handlers that stop the bot
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/**
Export the bot instance.
@type {Telegraf}
*/
module.exports = bot;
