const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const authController = require('../app/controllers/auth');
const usuarioController = require('../app/controllers/usuario');
const nextController = require('../app/controllers/next_routes');
const ajudaController = require('../app/controllers/ajuda');
const certificadoController = require('../app/controllers/certificado');
const auth = require('../app/controllers/token_auth');

//next
router.get ('/'                              , auth.authenticated, nextController.handler);
router.get ('/home'                          , auth.authenticated, nextController.handler);
router.get ('/invalid'                       , auth.not_authenticated, nextController.handler);
router.get ('/tutores'                       , auth.authenticated, nextController.handler);
router.get ('/avaliar'                       , auth.authenticated, nextController.handler);
//next /ajuda
router.post('/ajuda/agendar/:matricula' , auth.authenticated, nextController.handler);
router.post('/ajuda/aluno_reagendar/:id', auth.authenticated, nextController.handler);
router.post('/ajuda/tutor_reagendar/:id', auth.authenticated, nextController.handler);
//next /auth/
router.get ('/auth/forgot', auth.not_authenticated, nextController.handler);
router.get ('/auth/login' , auth.not_authenticated, nextController.handler);
router.get ('/auth/logout', auth.authenticated    , nextController.logout);
router.get ('/auth/signup', auth.not_authenticated, nextController.handler);
//next /auth/restart
router.get ('/auth/restart/:token', auth.not_authenticated, nextController.restart);
//next /denunciar
router.get ('/denunciar/:matricula', auth.authenticated, nextController.handler);
//next /home/coordenador
router.get ('/home/coordenador', auth.authenticated, nextController.handler);
//next /home/usuario
router.get ('/home/usuario', auth.authenticated, nextController.handler);
//next /dificuldade/
router.get ('/dificuldade/adicionar', auth.authenticated, nextController.handler);
router.get ('/dificuldade/remover'  , auth.authenticated, nextController.handler);
router.get ('/dificuldade/listar'   , auth.authenticated, nextController.handler);
//next monitoria
router.post('/monitoria/inscrever'        , auth.authenticated, nextController.handler);
router.post('/monitoria/listar'           , auth.authenticated, nextController.handler);
router.post('/monitoria/solicitacoes'     , auth.authenticated, nextController.handler);
//next /perfil/
router.get ('/perfil/:matricula'       , auth.authenticated, nextController.handler);
router.get ('/perfil/atualizar'        , auth.authenticated, nextController.handler);
router.get ('/perfil'                  , auth.authenticated, nextController.handler);
//next /especialidade/
router.get ('/especialidade/adicionar'  , auth.authenticated, nextController.handler);
router.get ('/especialidade/listar'     , auth.authenticated, nextController.handler);
router.get ('/especialidade/remover'    , auth.authenticated, nextController.handler);
//next /tutores
router.get ('/tutores/:disciplina', auth.authenticated, nextController.handler);
router.get ('/tutores'            , auth.authenticated, nextController.handler);
//next /tutores_disciplina
router.get ('/tutores_disciplina/:disciplina', auth.authenticated, nextController.handler);
router.get ('/tutores_disciplina'            , auth.authenticated, nextController.handler);

//main
router.get ('/api/cursos'                         , mainController.cursos);
router.get ('/api/disciplinas'                    , mainController.disciplinas);
router.get ('/api/disciplinas/:curso'             , mainController.disciplinas);
router.get ('/api/especialidade/listar'           , auth.authenticated, mainController.api_especialidade);
router.get ('/api/especialidade/listar/:matricula', auth.authenticated, mainController.api_especialidade);
router.post('/api/especialidade/adicionar'        , auth.authenticated, mainController.api_especialidade_adicionar);
router.post('/api/especialidade/remover'          , auth.authenticated, mainController.api_especialidade_remover);
router.get ('/api/dificuldade/listar'             , auth.authenticated, mainController.api_dificuldade);
router.post('/api/dificuldade/adicionar'          , auth.authenticated, mainController.api_dificuldade_adicionar);
router.post('/api/dificuldade/remover'            , auth.authenticated, mainController.api_dificuldade_remover);
router.get ('/api/tutores'                        , auth.authenticated, usuarioController.tutores);
router.get ('/api/tutores/:disciplina'            , auth.authenticated, usuarioController.tutores);
router.get ('/api/monitores'                      , auth.authenticated, usuarioController.monitores);
router.get ('/api/monitores/:disciplina'          , auth.authenticated, usuarioController.monitores);
router.get ('/api/tutores_disciplina'             , auth.authenticated, usuarioController.tutores_por_disciplina);
router.get ('/api/tutores_disciplina/:disciplina' , auth.authenticated, usuarioController.tutores_por_disciplina);
router.get ('/api/monitores_disciplina'           , auth.authenticated, usuarioController.monitores_por_disciplina);
router.get ('/api/monitores_disciplina/:disciplina', auth.authenticated, usuarioController.monitores_por_disciplina);
router.get ('/api/usuario'                        , auth.authenticated, usuarioController.usuario);
router.get ('/api/usuario/:matricula'             , auth.authenticated, usuarioController.usuario);
router.post('/api/atualizar_conta'                , auth.authenticated, usuarioController.atualizar_conta);
router.post('/api/atualizar_email'                , auth.authenticated, usuarioController.atualizar_email);
router.post('/api/atualizar_senha'                , auth.authenticated, usuarioController.atualizar_senha);
router.post('/api/denunciar/:matricula'           , auth.authenticated, usuarioController.denunciar);

//monitor
router.post('/api/monitoria/inscrever'           , auth.authenticated, mainController.monitoria_inscrever);
router.get ('/api/monitoria/listar'              , auth.authenticated, mainController.monitoria_listar);
router.get ('/api/monitoria/listar/aprovados'    , auth.authenticated, mainController.monitoria_listar_aprovados);
router.post('/api/monitoria/aceitar'             , auth.authenticated, mainController.monitoria_aceitar);
router.post('/api/monitoria/remover'             , auth.authenticated, mainController.monitoria_remover);
router.get ('/api/monitoria/listar/:matricula'   , auth.authenticated, mainController.monitoria_listar);
router.get ('/api/monitoria/solicitacoes_usuario', auth.authenticated, mainController.monitoria_solicitacoes_usuario);
router.get ('/api/monitoria/solicitacoes'        , auth.authenticated, mainController.monitoria_solicitacoes);

//auth
router.post('/api/auth/signup'        , auth.not_authenticated, authController.api_signup);
router.post('/api/auth/login'         , auth.not_authenticated, authController.api_login);
router.post('/api/auth/forgot'        , auth.not_authenticated, authController.api_forgot);
router.post('/api/auth/restart/:token', auth.not_authenticated, authController.api_restart);

//ajuda
router.get ('/api/ajuda/id/:id'                      , auth.authenticated, ajudaController.ajuda);
router.get ('/api/ajuda/agenda'                      , auth.authenticated, ajudaController.agenda);
router.get ('/api/ajuda/agenda/:matricula'           , auth.authenticated, ajudaController.agenda);
router.post('/api/ajuda/agendar'                     , auth.authenticated, ajudaController.agendar);
router.post('/api/ajuda/aceitar'                     , auth.authenticated, ajudaController.aceitar);
router.post('/api/ajuda/recusar'                     , auth.authenticated, ajudaController.recusar);
router.post('/api/ajuda/aluno_cancelar'              , auth.authenticated, ajudaController.aluno_cancelar);
router.post('/api/ajuda/tutor_cancelar'              , auth.authenticated, ajudaController.tutor_cancelar);
router.post('/api/ajuda/aluno_reagendar'             , auth.authenticated, ajudaController.aluno_reagendar);
router.post('/api/ajuda/tutor_reagendar'             , auth.authenticated, ajudaController.tutor_reagendar);
router.get ('/api/disponibilidade/listar'            , auth.authenticated, ajudaController.listar_disponibilidade);
router.get ('/api/disponibilidade/listar/:matricula' , auth.authenticated, ajudaController.listar_disponibilidade);
router.post('/api/disponibilidade/adicionar'         , auth.authenticated, ajudaController.adicionar_disponibilidade);
router.post('/api/ajuda/avaliar'                     , auth.authenticated, ajudaController.avaliar);
router.post('/api/ajuda/popup'                       , auth.authenticated, ajudaController.popup);

//certificado
router.get ('/api/certificado/horas'    , auth.authenticated, certificadoController.horas);
router.get ('/api/certificado/listar'   , auth.authenticated, certificadoController.listar);
router.post('/api/certificado/solicitar', auth.authenticated, certificadoController.solicitar);

//not found
router.get ('*', nextController.handler);

module.exports = router;