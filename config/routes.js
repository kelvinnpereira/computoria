const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');
const errorController = require('../app/controllers/error');

//mainController
router.get('/'                   , mainController.index);
router.get('/home'               , mainController.home);
router.get('/invalid'            , mainController.invalid);
router.get ('/cursos'            , mainController.cursos);
router.get ('/disciplinas'       , mainController.disciplinas);
router.get ('/disciplinas/:curso', mainController.disciplinas);

//authController
router.get ('/auth/signup'            , authController.signup);
router.get ('/api/auth/signup'        , authController.api_signup);
router.post('/api/auth/signup'        , authController.api_signup);
router.get ('/auth/login'             , authController.login);
router.get ('/api/auth/login'         , authController.api_login);
router.post('/api/auth/login'         , authController.api_login);
router.get ('/auth/logout'            , authController.logout);
router.get ('/auth/forgot'            , authController.forgot);
router.get ('/auth/restart/:token'    , authController.restart);
router.post('/api/auth/restart/:token', authController.api_restart);
router.post('/api/auth/forgot'        , authController.api_forgot);

//errorController
router.get ('/404', errorController.not_found);
router.get ('*'   , errorController.error);

module.exports = router;