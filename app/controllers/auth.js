const models = require('../models/index');
const auth = require('./token_auth');
const Usuario = models.usuario;
const MudarSenha = models.mudar_senha;

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const api_login = async (req, res) => {
    if (req.route.methods.post && req.body) {
        let value = /[a-zA-Z]/g.test(req.body.usuario) ? req.body.usuario : req.body.usuario.replace(/[^\d]+/g, '');
        let usuario = undefined;
        if (/^\d+$/.test(value)) {
            usuario = await Usuario.findOne({
                where: {
                    cpf: value,
                }
            });
        } else if (req.body.usuario.includes('@')) {
            usuario = await Usuario.findOne({
                where: {
                    email: req.body.usuario,
                }
            });
        }
        if (usuario) {
            bcrypt.compare(req.body.password, usuario.senha, (err, ok) => {
                if (ok) {
                    console.log('Login feito com sucesso');
                    res.status(200).send({
                        matricula: usuario.matricula,
                        cargo: usuario.cargo,
                        token: auth.generateAccessToken({ 
                            matricula: usuario.matricula, 
                            cargo: usuario.cargo
                        })
                    });
                } else {
                    console.log('Senha incorreta');
                    res.status(500).send({ error: 'Senha incorreta' });
                }
            });
        } else {
            console.log('Usuario não encontrado');
            res.status(500).send({ error: 'Usuario não encontrado' });
        }
    } else {
        res.status(404);
    }
}

const api_signup = async (req, res) => {
    if (req.route.methods.post && req.body) {
        try {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                    if (!err) {
                        await Usuario.create({
                            nome: req.body.nome,
                            cpf: req.body.cpf.replace(/[^\d]+/g, ''),
                            email: req.body.email,
                            matricula: req.body.matricula,
                            senha: hash,
                            sigla_curso: req.body.curso,
                            cargo: 'usuario',
                        }).then((sucess) => {
                            console.log('usuario criado com sucesso');
                            res.status(200).send({});
                        }).catch((error) => {
                            console.log('erro em criar usuario');
                            let msg = error?.errors[0]?.message.includes('PRIMARY must be unique') ? 'Este CPF já está sendo usado!' : error?.errors[0]?.message;
                            console.log(msg);
                            res.status(500).send({ error: msg });
                        });
                    } else {
                        console.log('error in bcrypt:' + err);
                        res.status(500).send({ err: err });
                    }
                });
            });
        } catch (error) {
            console.log('error after try catch:' + error);
            res.status(500).send({ error: error });
        }
    }
}

//console.log(req.headers, req.cookies, req.path, req.method, req.headers.cookies);

const api_forgot = async (req, res) => {
    if (req.route.methods.post && req.body) {
        let value = /[a-zA-Z]/g.test(req.body.usuario) ? req.body.usuario : req.body.usuario.replace(/[^\d]+/g, '');
        let usuario = undefined;
        if (/^\d+$/.test(value)) {
            usuario = await Usuario.findOne({
                where: {
                    cpf: value,
                }
            });
        } else if (req.body.usuario.includes('@')){
            usuario = await Usuario.findOne({
                where: {
                    email: req.body.usuario,
                }
            });
        }
        if (usuario) {
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
                to: usuario.email,
                subject: 'Computoria: Recuperação de senha',
                text: (process.env?.URL ? 'https://' + process.env.URL : "http://localhost:3000") + '/auth/restart/' + token
            };
            await MudarSenha.create({
                cpf: usuario.cpf,
                token: token,
                usado: false,
            })

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ error: error });
                } else {
                    console.log('Email enviado: ' + info.response);
                    res.status(200).send({ message: 'E-mail enviado com sucesso' });
                }
            });
        } else {
            console.log("Usuario não encontrado");
            res.status(500).send({ error: 'Usuario não encontrado' });
        }
    } else {
        res.redirect('/home');
    }
}

const api_restart = async (req, res) => {
    if (req.route.methods.post && req.params?.token) {
        let token = req.params.token;
        let request = await MudarSenha.findOne({
            where: {
                token: token,
            }
        });
        if (!request?.cpf || Date.now() - request.createdAt > 300000) {
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
                        res.status(200).send({ message: 'Senha alterada com sucesso' });
                    }).catch((error) => {
                        console.log('erro ao alterar a senha');
                        console.log(error.parent.sqlMessage);
                        res.status(500).send({ error: error.parent.sqlMessage });
                    });
                } else {
                    console.log('error in bcrypt:' + err);
                    res.status(500).send({ err: err });
                }
            });
        });
    } else {
        res.redirect('/home');
    }
}

module.exports = {
    api_login,
    api_signup,
    api_forgot,
    api_restart,
}