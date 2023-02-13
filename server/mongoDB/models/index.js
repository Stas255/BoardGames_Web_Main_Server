/**
 * @module server/mongoDB/models
 * @requires mongoose
 */

const { mongoose, Schema } = require('mongoose');

const User = require('./user.model')(mongoose, Schema);
/**
 * exports:mongoose,User,Token,ROLES
 * @returns {module:server/mongoDB/models~mongoose} mongoose
 * @returns {module:server/mongoDB/models~User} User
 * @returns {module:server/mongoDB/models~Migrate} Migrate
 */
module.exports = {
  mongoose,
  User
};
