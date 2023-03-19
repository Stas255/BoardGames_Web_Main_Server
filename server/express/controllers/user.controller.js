/**
 * @module server/express/controllers/userController
 * @requires server/classes/winston
 * @requires server/mongoDB/models
 * @description This moduledefines two functions isUser and isAdmin, which are used to validate the validity of the user and admin. Both take two arguments request and response, and returns a boolean indicating the validity of user or admin as response.send(JSON.stringify(true)).
 */

const LOG = require('../../classes/winston');

const { User } = require('../../mongoDB/models');

/**
validate the user is valid or not
@param {Object} request - Request object
@param {Object} response - Response object
@returns {void} A boolean value indicating the validity of the user
*/
const isUser = (request, response) => {
  response.send(JSON.stringify(true));
};

/**
validate the admin is valid or not
@param {Object} request - Request object
@param {Object} response - Response object
@returns {void} A boolean value indicating the validity of the admin
*/
const isAdmin = (request, response) => {
  response.send(JSON.stringify(true));
};

/**
Send user infor
@param {Object} request - Request object
@param {Object} response - Response object
@returns {void} Return information about user
*/
const infor = (request, response) => {
  User.findOne({ id: request.body.telegramId }).then(async user => {
    if (!user) { return response.status(500).send('User not found'); }
    return response.send(JSON.stringify({ full_name: user.name }));
  }).catch(err => {
    LOG.error(JSON.stringify(err));
    return response.status(500).send(JSON.stringify(err));
  });
};

module.exports = {
  isUser,
  isAdmin,
  infor
};
