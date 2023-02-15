const crypto = require('crypto');

const { User } = require('../mongoDB/models');

module.exports = function (bot) {
  bot.hears('Login', (ctx) => {
    User.findOne({ id: ctx.from.id }).then(async user => {
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
        const id = crypto.randomBytes(51).toString('hex');
        user.authToken = id;
        await user.save();
        ctx.reply(process.env.CHILD_HTTP + 'signin?id=' + id);
      }
    });
    setTimeout(function () {
      if (ctx.message) {
        ctx.deleteMessage(ctx.message.message_id);
      }
    }, 10000);
  });
};
