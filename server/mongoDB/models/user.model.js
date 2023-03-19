/**
 * @module server/mongoDB/models/userModel
 * @description This code is a function which defines and creates a schema for a User in the mongoose-role plugin. It creates a model with an 'id', 'name', and 'authToken' field, where the 'id' and 'name' fields are marked as 'required'. To provide authentication when users sign in, the 'authToken' field is optional but can be used. The plugin then adds roles ('public', 'user', 'admin') with corresponding access levels. Finally, it returns the User model.
 */

module.exports = function (mongoose, Schema) {
  /**
   * @class UserSchema
   * @classDesc A class which defines a schema for a User. The User model includes an ID, a name, and an authentication token. The ID and name fields are both set as 'required', meaning they are required fields which must have a valid value. The authentication token, while not required, can be used to provide authentication when users sign in.
   */
  const UserSchema = new Schema({
    /**
      *@memberof module:server/mongoDB/models/userModel~UserSchema
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
      *@memberof module:server/mongoDB/models/userModel~UserSchema
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
      *@memberof module:server/mongoDB/models/userModel~UserSchema
      *@name authToken
      *@type {String}
      *@description Token User
      */
    authToken: {
      type: String,
      required: false
    },
    /**
      *@memberof module:server/mongoDB/models/userModel~UserSchema
      *@name tokenId
      *@type {String}
      *@description Unic token id
      */
    tokenId: {
      type: String,
      required: false
    }
  });
  /**
    *UserSchema Plugin with Mongoose-Role
    *@function addRole
    *@description This plugin enables a user schema to use roles as specified and limited by access levels. The roles provided are Public, User and Admin.
    *@param {Object} roles - Roles that are available: 'public', 'user', 'admin'
    *@param {Object} accessLevels - Object containing all of the roles and the corresponding access:
    *public: Array - Contains all three roles
    *user: Array - Contains only the user role
    *admin: Array - Contains only the admin role
    */
  UserSchema.plugin(require('mongoose-role'), {
    roles: ['public', 'user', 'admin'],
    accessLevels: {
      public: ['public', 'user', 'admin'],
      user: ['user'],
      admin: ['admin']
    }
  });

  const User = mongoose.model('user', UserSchema);
  /**
  @param {*} return
  @description Returns the User model
  @returns User
  */
  return User;
};
