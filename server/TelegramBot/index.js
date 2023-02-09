const LOG = require('../classes/winston');

const bot = require('./telegraf');

bot.launch().catch(error => {
  if (error.code === 401) {
    bot.context = 99;
  } else {
    bot.context = 0;
  }
  LOG.error({ error: error.message || error });
});

module.exports = bot;
