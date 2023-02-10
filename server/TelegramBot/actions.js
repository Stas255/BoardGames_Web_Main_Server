const { User } = require('../mongoDB/models');

const LOG = require('../classes/winston');

module.exports = function (bot) {
  bot.action('Register', async (ctx) => {
    User.findOne({ id: ctx.from.id }).then(user => {
      if (user == null) {
        const newUser = new User({
          id: ctx.from.id + 1,
          name: ctx.from.first_name + ' ' + ctx.from.last_name,
          role: 'user'
        });
        newUser.save().then(user => {
          ctx.reply('User ' + ctx.from.first_name + ' ' + ctx.from.last_name + ' was created', {
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
          }).then(response => {
            setTimeout(function () {
              if (response) {
                ctx.deleteMessage(response.message_id);
              }
            }, 10000);
          });
        }
        ).catch(error => {
          LOG.error(error);
          ctx.reply('Get Error');
        });
      } else {
        ctx.reply('You are in db');
      }
    });
    setTimeout(function () {
      if (ctx.message) {
        ctx.deleteMessage(ctx.message.message_id);
      }
    }, 10000);
  });
};
