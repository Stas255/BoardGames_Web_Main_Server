/**
 * @module server/express
 * @requires express
 * @requires server/classes/winston
 * @requires server/express/routes/authRoutes
 * @requires server/express/routes/userRoutes
 * @see https://expressjs.com/
 * @description This script creates a child server on the given port
 */
const express = require('express');

const LOG = require('../classes/winston');

/**
 * App example
 * @desc App definition module
 */
const app = express();

/**
Registers all the middleware
*/
app.use(express.json());

const auth_routes = require('./routes/auth.routes');

const user_routes = require('./routes/user.routes');

app.use('/auth', auth_routes);
app.use('/user', user_routes);

/**
 * Create child server on given port
 * @param {number} process.env.CHILD_PORT the port to listen on
 */
const listen = app.listen(process.env.CHILD_PORT, () => {
  LOG.log('Created child server on port ' + process.env.CHILD_PORT);
}).on('error', (error) => {
  LOG.error('Get error during creting child server on port ' + process.env.CHILD_PORT);
  LOG.error(error);
});

module.exports = {
  listen,
  app
};
