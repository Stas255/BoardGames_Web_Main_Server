'use strict';

const { User, connect } = require('../db');

module.exports.up = async function (next) {
  try {
    await connect();
    const user = new User({
      name: 'Станіслав Толстоноженко',
      id: 461270780,
      role: 'user',
      authToken: null
    });
    await user.save();
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error: error.message || error });
  }
};

module.exports.down = async function (next) {
  try {
    await connect();
    await User.deleteOne({ id: 461270780 });
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error({ error: error.message || error });
  }
};
