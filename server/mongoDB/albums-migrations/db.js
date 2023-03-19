require('dotenv').config({ path: '../../../.env' });

const { mongoose, User } = require('../models');

const url = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@serverlessinstance0.bl5br.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
async function connect() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(url).catch((error) => {
    console.error({ error: error.message || error });
  });
}

async function dissconect() {
  mongoose.set('strictQuery', false);
  await mongoose.connection.close().catch((error) => {
    console.error({ error: error.message || error });
  });
}
module.exports = {
  mongoose,
  User,
  connect,
  dissconect
};
