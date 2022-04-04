const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');
const usuarioController = require('../app/controllers/usuario');
const nextController = require('../app/controllers/next_routes');
const ajudaController = require('../app/controllers/ajuda');
const auth = require('../app/controllers/token_auth');

//next
router.get ('/'                              , auth.authenticated, nextController.handler);
router.get ('/home'                          , auth.authenticated, nextController.handler);
router.get ('/invalid'                       , auth.not_authenticated, nextController.handler);
router.get ('/tutores'                       , auth.authenticated, nextController.handler);
router.get ('/denunciar/:matricula'          , auth.authenticated, nextController.handler);
router.get ('/tutores/:disciplina'           , auth.authenticated, nextController.handler);
router.get ('/tutores_disciplina'            , auth.authenticated, nextController.handler);
router.get ('/tutores_disciplina/:disciplina', auth.authenticated, nextController.handler);
//next /auth/
router.get ('/auth/forgot', auth.not_authenticated, nextController.handler);
router.get ('/auth/login' , auth.not_authenticated, nextController.handler);
router.get ('/auth/logout', auth.authenticated    , nextController.logout);
router.get ('/auth/signup', auth.not_authenticated, nextController.handler);
//next /auth/restart
router.get ('/auth/restart/:token'      , auth.not_authenticated, nextController.restart);
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
router.get ('/perfil/:matricula'       , auth.authenticated, nextController.handler);
//next monitoria
router.post('/monitoria/inscrever'        , auth.authenticated, nextController.handler);
router.post('/monitoria/listar'           , auth.authenticated, nextController.handler);
router.post('/monitoria/solicitacoes'     , auth.authenticated, nextController.handler);

//main
router.get ('/api/cursos'                        , mainController.cursos);
router.get ('/api/disciplinas'                   , mainController.disciplinas);
router.get ('/api/disciplinas/:curso'            , mainController.disciplinas);
router.get ('/api/proficiencia/listar'           , auth.authenticated, mainController.api_proficiencia);
router.get ('/api/proficiencia/listar/:matricula', auth.authenticated, mainController.api_proficiencia);
router.post('/api/proficiencia/adicionar'        , auth.authenticated, mainController.api_proficiencia_adicionar);
router.post('/api/proficiencia/remover'          , auth.authenticated, mainController.api_proficiencia_remover);
router.get ('/api/improficiencia/listar'         , auth.authenticated, mainController.api_improficiencia);
router.post('/api/improficiencia/adicionar'      , auth.authenticated, mainController.api_improficiencia_adicionar);
router.post('/api/improficiencia/remover'        , auth.authenticated, mainController.api_improficiencia_remover);
router.get ('/api/tutores'                       , auth.authenticated, usuarioController.tutores);
router.get ('/api/tutores/:disciplina'           , auth.authenticated, usuarioController.tutores);
router.get ('/api/tutores_disciplina'            , auth.authenticated, usuarioController.tutores_por_disciplina);
router.get ('/api/tutores_disciplina/:disciplina', auth.authenticated, usuarioController.tutores_por_disciplina);
router.get ('/api/usuario'                       , auth.authenticated, usuarioController.usuario);
router.get ('/api/usuario/:matricula'            , auth.authenticated, usuarioController.usuario);
router.post('/api/atualizar_conta'               , auth.authenticated, usuarioController.atualizar_conta);
router.post('/api/atualizar_email'               , auth.authenticated, usuarioController.atualizar_email);
router.post('/api/atualizar_senha'               , auth.authenticated, usuarioController.atualizar_senha);
router.post('/api/denunciar/:matricula'          , auth.authenticated, usuarioController.denunciar);

//monitor
router.post('/api/monitoria/inscrever'        , auth.authenticated, mainController.monitoria_inscrever);
router.get ('/api/monitoria/listar'           , auth.authenticated, mainController.monitoria_listar);
router.post('/api/monitoria/aceitar'          , auth.authenticated, mainController.monitoria_aceitar);
router.post('/api/monitoria/remover'          , auth.authenticated, mainController.monitoria_remover);
router.get ('/api/monitoria/listar/:matricula', auth.authenticated, mainController.monitoria_listar);
router.get ('/api/monitoria/solicitacoes_usuario', auth.authenticated, mainController.monitoria_solicitacoes_usuario);
router.get ('/api/monitoria/solicitacoes'     , auth.authenticated, mainController.monitoria_solicitacoes);

//auth
router.post('/api/auth/signup'        , auth.not_authenticated, authController.api_signup);
router.post('/api/auth/login'         , auth.not_authenticated, authController.api_login);
router.post('/api/auth/forgot'        , auth.not_authenticated, authController.api_forgot);
router.post('/api/auth/restart/:token', auth.not_authenticated, authController.api_restart);

//ajuda
router.get ('/api/ajuda/listar'                     , auth.authenticated, ajudaController.listar);
router.get ('/api/ajuda/listar/:matricula'          , auth.authenticated, ajudaController.listar);
router.post('/api/ajuda/agendar'                    , auth.authenticated, ajudaController.agendar);
router.get ('/api/disponibilidade/listar'           , auth.authenticated, ajudaController.listar_disponibilidade);
router.get ('/api/disponibilidade/listar/:matricula', auth.authenticated, ajudaController.listar_disponibilidade);
router.post('/api/disponibilidade/adicionar'        , auth.authenticated, ajudaController.adicionar_disponibilidade);

//not found
router.get ('*', nextController.handler);

module.exports = router;