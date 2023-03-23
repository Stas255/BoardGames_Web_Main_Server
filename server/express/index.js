/**
 * @module server/express
 * @requires express
 * @requires body-parser
 * @requires cors
 * @requires server/classes/winston
 * @requires server/express/routes/authRoutes
 * @requires server/express/routes/userRoutes
 * @see https://expressjs.com/
 * @description This script creates a child server on the given port
 */
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const LOG = require('../classes/winston');

/**
 * App example
 * @desc App definition module
 */
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_HTTP,
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

/**
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const auth_routes = require('./routes/auth.routes');

const user_routes = require('./routes/user.routes');

app.use('/auth', auth_routes);
app.use('/user', user_routes);

app.get('/', (req, res) => {
  res.send('Main server is running.');
});

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
