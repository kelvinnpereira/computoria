const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');

//mainController
router.get('/', mainController.index);
router.get('/home', mainController.home);

//authController
router.get ('/auth/signup'    , authController.signup);
router.get ('/api/auth/signup', authController.api_signup);
router.post('/api/auth/signup', authController.api_signup);
router.get ('/auth/login'     , authController.login);
router.get ('/api/auth/login' , authController.api_login);
router.post('/api/auth/login' , authController.api_login);
router.get ('/auth/logout'    , authController.logout);
router.get ('/auth/forgot'    , authController.forgot);

module.exports = router;