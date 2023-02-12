const router = require('express').Router();

const { hasAccess, verifyAccessToken } = require('../middleware/authJwt');

const { user_controller } = require('../controllers');

router.post('/isUser',
  [
    verifyAccessToken,
    hasAccess('user')
  ],
  user_controller.isUser);

router.post('/isAdmin',
  [
    verifyAccessToken,
    hasAccess('admin')
  ],
  user_controller.isAdmin);

module.exports = router;
