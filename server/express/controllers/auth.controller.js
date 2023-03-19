/**
 * @module server/express/controllers/authController
 * @requires jsonwebtoken
 * @requires server/classes/winston
 * @requires server/mongoDB/models
 * @description This code allows users to sign in and sign out of an application.
The signin function takes a request object and response object, checks the database to if the user is valid, and creates and sends a JSON web token in the response if successful.
The signout function also takes a request object and response object and sets the user's authToken to null so that the user is no longer logged in to the application.
 */
const jwt = require('jsonwebtoken');

const LOG = require('../../classes/winston');

const { User } = require('../../mongoDB/models');

/**
Signs in a user.
@param {Object} request - Request object
@param {Object} response - Response object
@return {void}
*/
const signin = (request, response) => {
  User.findOne({ id: request.body.telegramId }).then(async user => {
    if (!user) { return response.status(500).send('User not found'); }
    const unicToken = (Math.random() + 1).toString(36).substring(5);
    user.tokenId = unicToken;
    await user.save();
    await responseToken(user, response, unicToken);
  }).catch(err => {
    LOG.error(JSON.stringify(err));
    return response.status(500).send(JSON.stringify(err));
  });
};

/**
Sends response token.
@param {Object} user - User stored in Mongo database
@param {Object} response - Response object
@return {void}
*/
async function responseToken(user, response, unicToken) {
  const token = jwt.sign({ id: user.id, tokenId: unicToken }, process.env.SECRET_KEY, {
    expiresIn: 86400 // 24 hours
  });
  try {
    response.send({
      accessToken: token,
      user: {
        full_name: user.name
      }
    });
  } catch (err) {
    LOG.error(JSON.stringify(err));
  }
}

/**
Sign out a user.
@param {Object} request - Request object
@param {Object} response - Response object
@return {void}
*/
const signout = (request, response) => {
  User.findOne({ id: request.body.telegramId }).then(async user => {
    user.authToken = null;
    await user.save();
    response.send({ message: 'Finished' });
  }).catch(err => {
    LOG.error(JSON.stringify(err));
    return response.status(500).send(JSON.stringify(err));
  });
};

module.exports = {
  signout,
  signin
};
