const jwt = require('jsonwebtoken');

const LOG = require('../../classes/winston');

const { User } = require('../../mongoDB/models');

const signin = (request, response) => {
  User.findOne({ id: request.body.telegramId }).then(async user => {
    if (!user) { return response.status(500).send('User not found'); }
    await responseToken(user, response);
  }).catch(err => {
    LOG.error(JSON.stringify(err));
    return response.status(500).send(JSON.stringify(err));
  });
};

async function responseToken(user, response) {
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: 86400 // 24 hours
  });
  try {
    response.send({ AuthToken: token });
  } catch (err) {
    LOG.error(JSON.stringify(err));
  }
}

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
