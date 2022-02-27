const models = require('../models/index');
const url = require('url');
const Usuario = models.usuario;
const Curso = models.curso;

const bcrypt = require('bcryptjs');
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
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'kelvinn.nunes.p@gmail.com',
                        pass: 'gsadxqdxkvipcztn'
                    }
                });
                  
                let mailOptions = {
                    from: 'kelvinn.nunes.p@gmail.com',
                    to: user.email,
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!'
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                      res.status(500).send({error: error});
                    } else {
                      console.log('Email sent: ' + info.response);
                      res.status(200).send({message: 'E-mail enviado com sucesso'});
                    }
                });
            } else {
                res.status(500).send({error: 'Usuario não encontrado'});
            }
        } else {
            res.redirect('/home');
        }
    } 
}