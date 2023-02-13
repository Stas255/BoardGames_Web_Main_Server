const migrate = require('migrate');
const { mongoose, Schema } = require('mongoose');

const url = 'mongodb+srv://stas_tol:P4mLH4MOnmgsyI34@serverlessinstance0.bl5br.mongodb.net/BoardGames_Debug?retryWrites=true&w=majority';
const Migrate = mongoose.model('migrate', new Schema({ lastRun: Object, migrations: Object }));

class MongoDbStore {
  async load(fn) {
    let data = null;
    try {
      await mongoose.connect(url);
      data = await Migrate.find();
      if (data.length !== 1) {
        console.log('Cannot read migrations from database. If this is the first time you run migrations, then this is normal.');
        return fn(null, {});
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      mongoose.connection.close();
    }
    return fn(null, data[0]);
  };

  async save(set, fn) {
    let result = null;
    try {
      await mongoose.connect(url);
      result = await Migrate.updateMany({}, {
        $set: {
          lastRun: set.lastRun
        },
        $push: {
          migrations: { $each: set.migrations }
        }
      }, { upsert: true });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      mongoose.connection.close();
    }

    return fn(null, result);
  }
}

/**
 * Main application code
 */
migrate.load({
  // Set class as custom stateStore
  stateStore: new MongoDbStore()
}, function (err, set) {
  if (err) {
    throw err;
  }

  set.up((err2) => {
    if (err2) {
      throw err2;
    }
    console.log('Migrations successfully ran');
  });
});

module.exports = MongoDbStore;
