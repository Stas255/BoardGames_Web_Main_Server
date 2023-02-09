const LOG = require('../classes/winston');

require('dotenv').config();

const { mongoose, User } = require('./models');

mongoose.set('strictQuery', false);

mongoose.connection.on('open', function (ref) {
  return LOG.log('Connected to mongo server.');
});

mongoose.connection.on('error', function (err) {
  LOG.log('Could not connect to mongo server!');
  LOG.log(err);
  return err;
});

const uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@serverlessinstance0.bl5br.mongodb.net/BoardGames_Debug?retryWrites=true&w=majority';

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
