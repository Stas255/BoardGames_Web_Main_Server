/**
 * @module server/express/routes/userRoutes
 * @requires express
 * @requires server/express/controllers
 * @requires server/express/middleware/authJwt
 * @description This is the code for a router in an Express application that mounts authentication endpoints on certain routes.
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 */
const router = require('express').Router();

const { hasAccess, verifyAccessToken } = require('../middleware/authJwt');

const { user_controller } = require('../controllers');

/**
* POST Route to signin into the API
* @name post/isUser
* @memberof module:server/express/routes/userRoutes~userRouter
* @param {string} path - Express path
* @param {module:server/middleware/authJwt~verifyAccessToken} verifyAccessToken - verify Token
* @param {module:server/middleware/authJwt~hasAccess} hasAccessUser - check does user have role user
* @param {module:server/controllers/userController~isUser} isUser - response true is user has role user
*/
router.post('/isUser',
  [
    verifyAccessToken,
    hasAccess('user')
  ],
  user_controller.isUser);

/**
* POST Route to signin into the API
* @name post/isAdmin
* @memberof module:server/express/routes/userRoutes~userRouter
* @param {string} path - Express path
* @param {module:server/middleware/authJwt~verifyAccessToken} verifyAccessToken - verify Token
* @param {module:server/middleware/authJwt~hasAccess} hasAccessAdmin - check does user have role admin
* @param {module:server/controllers/userController~isAdmin} isAdmin - response true is user has role admin
*/
router.post('/isAdmin',
  [
    verifyAccessToken,
    hasAccess('admin')
  ],
  user_controller.isAdmin);

/**
* POST Route to signin into the API
* @name post/isAdmin
* @memberof module:server/express/routes/userRoutes~userRouter
* @param {string} path - Express path
* @param {module:server/middleware/authJwt~verifyAccessToken} verifyAccessToken - verify Token
* @param {module:server/middleware/authJwt~hasAccess} hasAccessUser - check does user have role user
* @param {module:server/controllers/userController~isAdmin} isAdmin - response true is user has role admin
*/
router.post('/infor',
  [
    verifyAccessToken,
    hasAccess('user')
  ],
  user_controller.infor);

/**
 * exports:router
 * @returns {module:server/express/routes/userRoutes~userRouter} router
 */
module.exports = router;
