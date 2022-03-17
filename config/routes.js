const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');
const errorController = require('../app/controllers/error');
const usuarioController = require('../app/controllers/usuario');

//mainController
router.get ('/'                            , mainController.index);
router.get ('/home'                        , mainController.home);
router.get ('/invalid'                     , mainController.invalid);
router.get ('/cursos'                      , mainController.cursos);
router.get ('/disciplinas'                 , mainController.disciplinas);
router.get ('/disciplinas/:curso'          , mainController.disciplinas);
router.get ('/proficiencia/adicionar'      , mainController.proficiencia);
router.get ('/proficiencia/remover'        , mainController.proficiencia);
router.get ('/proficiencia/listar'         , mainController.proficiencia);
router.get ('/improficiencia/adicionar'    , mainController.improficiencia);
router.get ('/improficiencia/remover'      , mainController.improficiencia);
router.get ('/improficiencia/listar'       , mainController.improficiencia);
router.get ('/api/proficiencia/listar'     , mainController.api_proficiencia);
router.post('/api/proficiencia/adicionar'  , mainController.api_proficiencia_adicionar);
router.post('/api/proficiencia/remover'    , mainController.api_proficiencia_remover);
router.get ('/api/improficiencia/listar'   , mainController.api_improficiencia);
router.post('/api/improficiencia/adicionar', mainController.api_improficiencia_adicionar);
router.post('/api/improficiencia/remover'  , mainController.api_improficiencia_remover);
router.get ('/perfil/atualizar'            , mainController.perfil_atualizar);

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

router.get('/usuario/:matricula'    , usuarioController.usuario);
router.get('/api/usuario/:matricula', usuarioController.api_usuario);
router.get('/api/listar_tutores'    , usuarioController.listar_tutores);

//errorController
router.get ('/404', errorController.not_found);
router.get ('*'   , errorController.error);

module.exports = router;