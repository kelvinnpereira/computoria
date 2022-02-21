const models = require('../models/index');
const url = require('url');
const Usuario = models.usuario;
const Curso = models.curso;

const bcrypt = require('bcryptjs');

const next = require('next');
const dev = false;
const app = next({dev});
const handle = app.getRequestHandler();

module.exports = {

    login: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else if (req.route.methods.get) {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        }
    },

    api_login: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else if (req.route.methods.post) {
            console.log('user');
            let user = undefined;
            if (/^\d+$/.test(req.body.username)) {
                user = await Usuario.findOne({
                    where: {
                        cpf: req.body.username,
                    }
                });
            } else {
                user = await Usuario.findOne({
                    where: {
                        email: req.body.username,
                    }
                });
            }
            if (user) {
                bcrypt.compare(req.body.password, user.senha, (err, ok) => {
                    if (ok) {
                        req.session.user = user.email;
                        res.status(200).send({redirect: '/home'});
                    } else {
                        res.status(500).send({error: 'Senha incorreta'});
                    }
                });
            } else {
                res.status(500).send({error: 'Usuario não encontrado'});
            }
        }
    },

    logout: async function (req, res) {
        if (req.session.user) {
            console.log('logout');
            handle(req, res);
        } else {
            res.redirect('/');
        }
    },

    api_logout: async function (req, res) {
        if (req.session.user) {
            req.session.user = '';
            res.status(200);
        } else {
            res.redirect('/');
        }
    },

    api_signup: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            if (req.route.methods.get) {
                var cursos = await Curso.findAll();
                res.status(200).send({
                    cursos: cursos,
                });
            } else {
                try {
                    console.log(req.body);
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                            if (!err) {
                                let curso = await Curso.findOne({where: {nome: req.body.curso}});
                                await Usuario.create({
                                    nome: req.body.nome,
                                    cpf: req.body.cpf,
                                    email: req.body.email,
                                    matricula: req.body.matricula,
                                    senha: hash,
                                    sigla_curso: curso.sigla
                                }).then((sucess) => {
                                    console.log('usuario criado com sucesso');
                                    res.status(200).send({redirect: '/auth/login'});
                                }).catch((error) => {
                                    console.log('erro em criar usuario');
                                    console.log(error.parent.sqlMessage);
                                    res.status(500).send({error: error.parent.sqlMessage});
                                });
                            } else {
                                console.log('-----------------------error in bcrypt:' + err);
                                res.status(500).send({redirect: '/'});
                            }
                        });
                    });
                } catch (error) {
                    console.log('--------------------error after try catch:' + error);
                    res.status(500).send({redirect: '/'});
                }
            }
        }
    },

    signup: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            const parsedUrl = url.parse(req.url, true);
            //console.log('parsedUrl: ' + parsedUrl);
            //console.log(parsedUrl);
            //console.log(req.headers, req.cookies, req.path, req.method, req.headers.cookies);
            handle(req, res, parsedUrl);
        }
    },

    forgot: async function (req, res) {
    },
}