/**
 * @module server/express/controllers/userController
 * @description This moduledefines two functions isUser and isAdmin, which are used to validate the validity of the user and admin. Both take two arguments request and response, and returns a boolean indicating the validity of user or admin as response.send(JSON.stringify(true)).
 */

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

module.exports = {
  isUser,
  isAdmin
};
