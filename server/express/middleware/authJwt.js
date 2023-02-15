
const jwt = require('jsonwebtoken');

const { User } = require('../../mongoDB/models');

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
