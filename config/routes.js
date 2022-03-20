const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');
const usuarioController = require('../app/controllers/usuario');
const nextController = require('../app/controllers/next_routes');
const auth = require('../app/controllers/token_auth');

//next
router.get ('/'                        , auth.authenticated, nextController.handler);
router.get ('/home'                    , auth.authenticated, nextController.handler);
router.get ('/404'                     , nextController.handler);
router.get ('/500'                     , nextController.handler);
router.get ('/invalid'                 , auth.not_authenticated, nextController.handler);
router.get ('/listTutors'              , auth.authenticated, nextController.handler);
//next /auth/
router.get ('/auth/forgot'             , auth.not_authenticated, nextController.handler);
router.get ('/auth/login'              , auth.not_authenticated, nextController.handler);
router.get ('/auth/logout'             , auth.authenticated, nextController.logout);
router.get ('/auth/signup'             , auth.not_authenticated, nextController.handler);
//next /auth/restart
router.get ('/auth/restart/:token'     , auth.not_authenticated, nextController.restart);
//next /improficiencia/
router.get ('/improficiencia/adicionar', auth.authenticated, nextController.handler);
router.get ('/improficiencia/remover'  , auth.authenticated, nextController.handler);
router.get ('/improficiencia/listar'   , auth.authenticated, nextController.handler);
//next /proficiencia/
router.get ('/proficiencia/adicionar'  , auth.authenticated, nextController.handler);
router.get ('/proficiencia/remover'    , auth.authenticated, nextController.handler);
router.get ('/proficiencia/listar'     , auth.authenticated, nextController.handler);
//next /perfil/
router.get ('/perfil/atualizar'        , auth.authenticated, nextController.handler);
router.get ('/perfil'                  , auth.authenticated, nextController.handler);

//main
router.get ('/api/cursos'                  , mainController.cursos);
router.get ('/api/disciplinas'             , mainController.disciplinas);
router.get ('/api/disciplinas/:curso'      , mainController.disciplinas);
router.get ('/api/proficiencia/listar'     , auth.authenticated, mainController.api_proficiencia);
router.post('/api/proficiencia/adicionar'  , auth.authenticated, mainController.api_proficiencia_adicionar);
router.post('/api/proficiencia/remover'    , auth.authenticated, mainController.api_proficiencia_remover);
router.get ('/api/improficiencia/listar'   , auth.authenticated, mainController.api_improficiencia);
router.post('/api/improficiencia/adicionar', auth.authenticated, mainController.api_improficiencia_adicionar);
router.post('/api/improficiencia/remover'  , auth.authenticated, mainController.api_improficiencia_remover);
router.get ('/api/listar_tutores'          , auth.authenticated, usuarioController.listar_tutores);
router.get ('/api/usuario'                 , usuarioController.usuario);
router.post('/api/atualizar_conta'         , auth.authenticated, usuarioController.atualizar_conta);
router.post('/api/atualizar_email'         , auth.authenticated, usuarioController.atualizar_email);
router.post('/api/atualizar_senha'         , auth.authenticated, usuarioController.atualizar_senha);

//auth
router.post('/api/auth/signup'        , auth.not_authenticated, authController.api_signup);
router.post('/api/auth/login'         , auth.not_authenticated, authController.api_login);
router.post('/api/auth/forgot'        , auth.not_authenticated, authController.api_forgot);
router.post('/api/auth/restart/:token', auth.not_authenticated, authController.api_restart);

//not found
router.get ('*', nextController.handler);

module.exports = router;