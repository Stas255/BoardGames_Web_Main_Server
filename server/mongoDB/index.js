/**
 * @module server/mongoDB
 * @requires express
 * @requires server/classes/winston
 * @requires server/mongoDB/models
 * @description This module is used to establish a connection with MongoDB database.
 */
const LOG = require('../classes/winston');

require('dotenv').config();

const { mongoose, User } = require('./models');

/**
@description Set string query restrictions.
@const
*/
mongoose.set('strictQuery', false);

/**
@description Trigger when connected to the mongo server.
Logs a message to console when connected.
@const
*/
mongoose.connection.on('open', function (ref) {
  return LOG.log('Connected to mongo server.');
});

/**
@description Trigger when faced an error while trying to connect to mongo server.
Logs a message with error stacktrace to console.
@const
*/
mongoose.connection.on('error', function (err) {
  LOG.log('Could not connect to mongo server!');
  LOG.log(err);
  return err;
});

/**
@description Get the credentials from .env file
@const
*/
const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@serverlessinstance0.bl5br.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';

/**
@description Connect with the mongodb using provided URI.
Logs message in console.
@const
*/
mongoose.connect(uri).then(result => {
  User.updateMany({}, { $set: { authToken: null } }, function (err, user) {
    if (err) {
      LOG.error(JSON.stringify(err));
    }
  });
  LOG.log('Mongodb connnected');
}).catch((error) => {
  LOG.error({ error: error.message || error });
});
