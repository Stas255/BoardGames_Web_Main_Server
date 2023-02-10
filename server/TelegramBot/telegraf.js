const { Telegraf, session } = require('telegraf');

const BOT_TOKEN = '5978965225:AAGGgfVLEFW4j3p9NBIgOZez1MdqbqtE3GI';

const bot = new Telegraf(BOT_TOKEN);

bot.use(session());

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;
