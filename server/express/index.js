const express = require('express');

const LOG = require('../classes/winston');

const app = express();

app.use(express.json());

const auth_routes = require('./routes/auth.routes');

const user_routes = require('./routes/user.routes');

app.use('/auth', auth_routes);
app.use('/user', user_routes);

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
