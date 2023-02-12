const LOG = require('../classes/winston');

const bot = require('./telegraf');

require('./actions')(bot);
require('./hears')(bot);
require('./commands')(bot);

bot.launch().catch(error => {
  if (error.code === 401) {
    bot.context = 99;
  } else {
    bot.context = 0;
  }
  LOG.error({ error: error.message || error });
});

module.exports = bot;
