/**
 * @module server/express/controllers
 * @requires server/express/controllers/authController
 * @requires server/express/controllers/userController
 * @description This module defines an object and exports it. The object includes two controllers (defined in different files), auth_controller and user_controller.
 */
const auth_controller = require('./auth.controller');
const user_controller = require('./user.controller');

module.exports = {
  auth_controller,
  user_controller
};
