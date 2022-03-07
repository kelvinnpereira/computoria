const models = require('../models/index');
const url = require('url');
const Usuario = models.usuario;
const Curso = models.curso;
const MudarSenha = models.mudar_senha;

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const next = require('next');
const dev = process.env.NODE_ENV?.trim() == 'development';
const app = next({dev});
const handle = app.getRequestHandler();

module.exports = {

    login: async (req, res) => {
        if (!req.session.user && req.route.methods.get) {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        } else {
            res.redirect('/home');
        }
    },

    api_login: async (req, res) => {
        if (req.route.methods.post) {
            let username = req.body.username.replace(/[^\d]+/g, '');
            if (/^\d+$/.test(username)) {
                await Usuario.findOne({
                    where: {
                        cpf: username,
                    }
                }).then(async (sucess) => {
                    if (sucess) {
                        bcrypt.compare(req.body.password, sucess.senha, (err, ok) => {
                            if (ok) {
                                req.session.user = sucess.cpf;
                                res.status(200).send({redirect: '/home'});
                            } else {
                                res.status(500).send({error: 'Senha incorreta'});
                            }
                        });
                    } else {
                        res.status(500).send({error: 'Usuario não encontrado'});
                    }
                });
            } else {
                await Usuario.findOne({
                    where: {
                        email: req.body.username,
                    }
                }).then(async (sucess) => {
                    if (sucess) {
                        bcrypt.compare(req.body.password, sucess.senha, (err, ok) => {
                            if (ok) {
                                req.session.user = sucess.cpf;
                                res.status(200).send({redirect: '/home'});
                            } else {
                                res.status(500).send({error: 'Senha incorreta'});
                            }
                        });
                    } else {
                        res.status(500).send({error: 'Usuario não encontrado'});
                    }
                });;
            }
        } else {
            res.status(404);
        }
    },

    logout: async (req, res) => {
        if (req.session.user) {
            req.session.destroy();
            handle(req, res);
        } else {
            res.redirect('/home');
        }
    },

    api_signup: async (req, res) => {
        if (req.session.user) {
            res.redirect('/home');
        } else if (req.route.methods.get) {
            var cursos = await Curso.findAll();
            res.status(200).send({
                cursos: cursos,
            });
        } else if (req.route.methods.post){
            try {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                        if (!err) {
                            let curso = await Curso.findOne({where: {nome: req.body.curso}});
                            await Usuario.create({
                                nome: req.body.nome,
                                cpf: req.body.cpf.replace(/[^\d]+/g, ''),
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
                            console.log('error in bcrypt:' + err);
                            res.status(500).send({redirect: '/home'});
                        }
                    });
                });
            } catch (error) {
                console.log('error after try catch:' + error);
                res.status(500).send({redirect: '/home'});
            }
        }
    },

    signup: async (req, res) => {
        if (!req.session.user && req.route.methods.get){
            res.cookie('XSRF-TOKEN', req.csrfToken());
            //console.log(req.headers, req.cookies, req.path, req.method, req.headers.cookies);
            handle(req, res);
        } else {
            res.redirect('/home');
        }
    },

    forgot: async (req, res) => {
        if (!req.session.user && req.route.methods.get){
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        } else {
            res.redirect('/home');
        }
    },

    api_forgot: async (req, res) => {
        if (req.route.methods.post) {
            console.log(req.body);
            let username = req.body.username;
            let user = undefined;
            if (/^\d+$/.test(username)) {
                user = await Usuario.findOne({
                    where: {
                        cpf: username,
                    }
                });
            } else {
                user = await Usuario.findOne({
                    where: {
                        email: username,
                    }
                });
            }
            if (user) {
                let email = {
                    user: 'computoriapes@gmail.com',
                    pass: 'Computoria@123'
                }

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: email
                });
                let token = crypto.randomBytes(48).toString('hex');
                let mailOptions = {
                    from: email.user,
                    to: user.email,
                    subject: 'Computoria: Recuperação de senha',
                    text: 'http://' + (process.env?.URL ? process.env.URL : "localhost:3000") + '/auth/restart/' + token
                };
                await MudarSenha.create({
                    cpf: user.cpf,
                    token: token,
                    usado: false,
                })
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                      res.status(500).send({error: error});
                    } else {
                      console.log('Email enviado: ' + info.response);
                      res.status(200).send({message: 'E-mail enviado com sucesso'});
                    }
                });
            } else {
                console.log("Usuario não encontrado");
                res.status(500).send({error: 'Usuario não encontrado'});
            }
        } else {
            res.redirect('/home');
        }
    },

    restart: async (req, res) => {
        if (!req.session.user && req.route.methods.get && req.params?.token){
            let token = req.params.token;
            let request = await MudarSenha.findOne({
                where: {
                    token: token,
                }
            });
            if(!request?.cpf || Date.now() - request.createdAt > 300000) {
                return res.redirect('/invalid');
            }
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        } else {
            res.redirect('/home');
        }
    },

    api_restart: async (req, res) => {
        if (!req.session.user && req.route.methods.post && req.params?.token){
            let token = req.params.token;
            let request = await MudarSenha.findOne({
                where: {
                    token: token,
                }
            });
            if(!request?.cpf || Date.now() - request.createdAt > 300000) {
                return res.redirect('/invalid');
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                    if (!err) {
                        await Usuario.update({
                            senha: hash,
                        }, {
                            where: {
                                cpf: request.cpf
                            }
                        }).then((sucess) => {
                            console.log('senha alterada com sucesso');
                            res.status(200).send({message: 'Senha alterada com sucesso'});
                        }).catch((error) => {
                            console.log('erro ao alterar a senha');
                            console.log(error.parent.sqlMessage);
                            res.status(500).send({error: error.parent.sqlMessage});
                        });
                    } else {
                        console.log('error in bcrypt:' + err);
                        res.status(500).send({redirect: '/home'});
                    }
                });
            });
            
        } else {
            res.redirect('/home');
        }
    },

}