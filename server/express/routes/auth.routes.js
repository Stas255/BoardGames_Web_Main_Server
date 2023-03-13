/**
 * @module server/express/routes/authRoutes
 * @requires express
 * @requires server/express/controllers
 * @requires server/express/middleware/authJwt
 * @description This is the code for a router in an Express application that mounts authentication endpoints on certain routes.
 */

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const router = require('express').Router();

const { auth_controller } = require('../controllers');

const { verifyAccessToken, parseLoginId } = require('../middleware/authJwt');

/**
* POST Route to signin into the API
* @name post/signin
* @memberof module:server/express/routes/authRoutes~authRouter
* @param {string} path - Express path
* @param {module:server/middleware/authJwt~parseLoginId} parseLoginId - parse param id
* @param {module:server/controllers/authController~signin} signin - parse param id
*/
router.post('/signin',
  [
    parseLoginId
  ],
  auth_controller.signin);

/**
* POST Route to signout into the API
* @name post/signout
* @memberof module:server/express/routes/authRoutes~authRouter
* @param {string} path - Express path
* @param {module:server/middleware/authJwt~verifyAccessToken} verifyAccessToken - verify Token
* @param {module:server/controllers/authController~signout} signout - signout
*/
router.post('/signout',
  [
    verifyAccessToken
  ],
  auth_controller.signout);

module.exports = router;
