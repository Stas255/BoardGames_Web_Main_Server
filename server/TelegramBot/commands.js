/**
 * @module server/TelegramBot/commands
 * @desc Contains all bot commands
 */

module.exports = function (bot) {
  bot.command('oldschool', (ctx) => {
    ctx.reply('Hello');
  });

  /**
   * @name commandStart
   * @desc Command to greet the user and offer login/logout options
   * @param {Object} ctx - Context object passed on by Telegram
  */
  bot.command('start', (ctx) => {
    ctx.reply('Hi ' + ctx.from.first_name + ' ' + ctx.from.last_name, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{
            text: 'Login',
            callback_data: 'Login'
          },
          {
            text: 'Logout',
            callback_data: 'Logout'
          }]
        ]
      }
    });
    setTimeout(function () {
      if (ctx.message) {
        ctx.deleteMessage(ctx.message.message_id);
      }
    }, 10000);
  });
};
