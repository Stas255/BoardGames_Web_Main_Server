const { Telegraf } = require('telegraf');

const BOT_TOKEN = '5978965225:AAGGgfVLEFW4j3p9NBIgOZez1MdqbqtE3GI';

const bot = new Telegraf(BOT_TOKEN);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.command('oldschool', (ctx) => {
  ctx.reply('Hello');
});

bot.command('start', (ctx) => {
  ctx.reply('Hi ' + ctx.from.first_name + ' ' + ctx.from.last_name, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Login', callback_data: 'Login' }]
      ]
    }
  }).then(response => {
    setTimeout(function () {
      if (response) {
        ctx.deleteMessage(response.message_id);
      }
    }, 10000);
  });
  setTimeout(function () {
    if (ctx.message) {
      ctx.deleteMessage(ctx.message.message_id);
    }
  }, 10000);
});

/* bot.use((ctx, next) => {
  bot.context = new UserInfor(ctx.from.first_name, ctx.from.last_name);
  setTimeout(function () {
    if (ctx.message) {
      ctx.deleteMessage(ctx.message.message_id);
    }
  }, 1000);
  next();
}); */

module.exports = bot;
