/**
 * @module server/mongoDB/models
 * @requires mongoose
 * @description This code exports the mongoose object and User model from the server/mongoDB/models folder. The mongoose object is used for defining models to interact and read from MongoDB, and the User model is used for creating and interacting with users in the MongoDB database.
 */

const { mongoose, Schema } = require('mongoose');

/**
 * @desc Create User model class
 */
const User = require('./user.model')(mongoose, Schema);

module.exports = {
  mongoose,
  User
};
