/**
 * @module server/express/middleware/authJwt
 * @requires jsonwebtoken
 * @requires server/mongoDB/models
 * @description This file contains the implementations for authenticating users.
 */

const jwt = require('jsonwebtoken');

const { User } = require('../../mongoDB/models');

/**
Verifies an access token for a user
@param {Object} request - The request object
@param {Object} response - The response object
@param {Function} next - The next function to be called
@returns {undefined}
*/
const verifyAccessToken = (request, response, next) => {
  const bearerHeader = request.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err instanceof jwt.JsonWebTokenError) {
        return response.status(401).send(JSON.stringify({ message: 'Token is incorrect' }));
      } else if (err) {
        return response.status(401).send(JSON.stringify({ message: 'Got error during tokenverify ' }));
      }
      request.body.telegramId = decoded.id;
      next();
    });
  } else {
    return response.status(403).send(JSON.stringify({ message: 'No token provided!' }));
  }
};

/**
Parses a login id and attaches it to the request object
@param {Object} request - The request object
@param {Object} response - The response object
@param {Function} next - The next function to be called
@returns {undefined}
*/
const parseLoginId = (request, response, next) => {
  const id = request.query.id;
  User.findOne(
    {
      authToken: id
    }
  ).then(async user => {
    if (user) {
      request.body.telegramId = user.id;
      user.authToken = null;
      await user.save();
      return next();
    }
    return response.status(403).send(JSON.stringify({ message: 'Cannot find user' }));
  }).catch(err => {
    return response.status(500).send(JSON.stringify(err));
  });
};

/**
 * @function hasAccess
 * @desc Verifies that a user has the permission level specified.
 * @param {String} accessLevel - Permission level to be tested.
 * @return {undefined} - A function that takes a request, response and next parameters. If the user has the access level specified, the
    next middleware is called. Otherwise a 403 is returned.
 */
function hasAccess(accessLevel) {
  return function (request, response, next) {
    User.findOne(
      {
        id: request.body.telegramId
      }
    ).then(user => {
      if (user && user.hasAccess(accessLevel)) {
        return next();
      }
      return response.status(403).send(JSON.stringify({ message: 'Require ' + accessLevel + ' Role!' }));
    }).catch(err => {
      return response.status(500).send(JSON.stringify(err));
    });
  };
}

module.exports = {
  verifyAccessToken,
  hasAccess,
  parseLoginId
};
