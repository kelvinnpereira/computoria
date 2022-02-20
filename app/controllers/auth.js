const models = require('../models/index');
const User = models.user;
const Curso = models.curso;

const bcrypt = require('bcryptjs');

const next = require('next');
const dev = false;
const app = next({dev});
const handle = app.getRequestHandler();

module.exports = {

    login: async function (req, res) {
        handle(req, res);
    },

    api_login: async function (req, res) {
        let cursos = await Curso.findAll();
        console.log('cursos' + cursos);
        res.status(200).send({cursos: cursos});
    },

    logout: async function (req, res) {
        console.log('logout');
        return handle(req, res);
    },

    api_signup: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            console.log(req.route.methods.get);
            if (req.route.methods.get) {
                var cursos = await Curso.findAll();
                res.status(200).send({
                    cursos: cursos,
                    csrfToken: req.csrfToken()
                });
            } else {
                try {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                            if (!err) {
                                await User.create({
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    senha: hash,
                                    id_curso: req.body.curso
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    });
                    res.redirect('/');
                } catch (error) {
                    console.log(error);
                    res.redirect('/');
                }
            }
        }
    },

    signup: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            console.log(req.route.methods.get);
            if (req.route.methods.get) {
                var cursos = await Curso.findAll();
                app.render(req, res, '/auth/signup', {cursos: cursos});
            } else {
                /*try {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                            if (!err) {
                                await User.create({
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    senha: hash,
                                    id_curso: req.body.curso
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    });
                    res.redirect('/');
                } catch (error) {
                    console.log(error);
                    res.redirect('/');
                }*/
            }
        }
    },

    forgot: async function (req, res) {
    },
}