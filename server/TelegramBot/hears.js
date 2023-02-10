const { User } = require('../mongoDB/models');
module.exports = function (bot) {
  bot.hears('Login', (ctx) => {
    User.findOne({ id: ctx.from.id }).then(user => {
      if (user == null) {
        ctx.reply('You are a new user. Do you want to register?', {
          reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            inline_keyboard: [
              [{
                text: 'Yes',
                callback_data: 'Register'
              }]
            ]
          }
        }).then(response => {
          setTimeout(function () {
            if (response) {
              ctx.deleteMessage(response.message_id);
            }
          }, 10000);
        });
      } else {
        ctx.reply('http_site');
      }
    });
    setTimeout(function () {
      if (ctx.message) {
        ctx.deleteMessage(ctx.message.message_id);
      }
    }, 10000);
  });
};
