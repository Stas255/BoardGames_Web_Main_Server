/**
 * @module server/mongoDB/models
 * @name UserSchema
 */

module.exports = function (mongoose, Schema) {
  /**
   *  @class UserSchema
   */
  const UserSchema = new Schema({
    /**
      *@memberOf UserSchema
      *@name id
      *@type {Number}
      *@description Unique ID for the user
      *@required
      */
    id: {
      type: Number,
      unique: true,
      required: true
    },
    /**
      *@memberOf UserSchema
      *@name name
      *@type {String}
      *@description Full name of the user
      *@required
      */
    name: {
      type: String,
      required: true
    },
    /**
      *@memberOf UserSchema
      *@name authToken
      *@type {String}
      *@description Token User
      */
    authToken: {
      type: String,
      required: false
    }
  });

  UserSchema.plugin(require('mongoose-role'), {
    /**
      * @memberOf UserSchema
      * @namespace roles
      */
    roles: ['public', 'user', 'admin'],
    accessLevels: {
      public: ['public', 'user', 'admin'],
      user: ['user'],
      admin: ['admin']
    }
  });

  const User = mongoose.model('user', UserSchema);
  return User;
};
