const router = require('express').Router();

const { auth_controller } = require('../controllers');

const { verifyAccessToken } = require('../middleware/authJwt');

router.post('/signin', auth_controller.signin);

router.post('/signout',
  [
    verifyAccessToken
  ],
  auth_controller.signout);

module.exports = router;
