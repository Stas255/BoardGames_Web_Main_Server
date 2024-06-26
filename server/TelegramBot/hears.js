/**
 * @module server/TelegramBot/hears
 * @requires crypto
 * @requires server/mongoDB/models
 * @desc Contains all bot hears
 */
const crypto = require('crypto');

const { User } = require('../mongoDB/models');

module.exports = function (bot) {
  /**
  @name hearsLogin
  @desc Login hears for bot
  @param {object} ctx - The context of the telegram message
  */
  bot.hears('Login', (ctx) => {
    /**
    * Find user in the database.
    * @param {Object} ctx - An object containing all the context information about the message
    */
    User.findOne({ id: ctx.from.id }).then(async user => {
      if (user == null) {
        /**
        * Reply to user asking if they would like to register
        * @function
        * @param {string} ctx - Contains the context information of the message
        * @param {Object} reply_markup - Contains the reply keyboard markup and the options available
        */
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
        /**
        * @desc Generate unique token
        */
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
