const models = require('../models/index');
const sequelize = models.sequelize;
const Usuario = models.usuario;
const bcrypt = require('bcryptjs');
const auth = require('./token_auth');

const tutores = async (req, res) => {
    if (req.route.methods.get && req.params?.disciplina) {
        const disciplina = req.params.disciplina;
        await sequelize.query(`\
            SELECT
                c.nome AS curso, u.nome AS usuario, matricula
            FROM
                    (SELECT 
                        DISTINCT(cpf) AS cpf 
                    FROM 
                        proficiencia 
                    ${disciplina !== 'all' ? `WHERE sigla_disciplina = \'${disciplina}\'` : ''}) AS prof
                INNER JOIN
                    usuario AS u
                ON
                    prof.cpf = u.cpf
                INNER JOIN
                    curso AS c
                ON
                    sigla = sigla_curso
            ;
        `).then((tutores) => {
            if (tutores?.at(0)?.length > 0) {
                console.log('Listar tutores');
                res.status(200).send({ tutores: tutores?.at(0) });
            } else {
                console.log('Tutores não encontrados');
                res.status(500).send({ tutores: [] });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        });
    } else {
        res.status(500).send({ error: 'error' });
    }
}

const usuario = async (req, res) => {
    if (req.route.methods.get && req.params?.matricula) {
        await Usuario.findOne({
            attributes: [
                'nome',
                'cpf',
                'matricula',
                'email',
                'sigla_curso',
            ],
            where: {
                matricula: req.params.matricula
            }
        }).then((usuario) => {
            if (usuario) {
                console.log('Get usuario ' + usuario);
                res.status(200).send({ usuario: usuario });
            } else {
                console.log('Usuario não encontrado');
                res.status(500).send({ usuario: usuario });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        });
    } else {
        console.log('Sem usuario na query');
        res.status(500).send({ error: 'error' });
    }
}

const atualizar_conta = async (req, res) => {
    if (req.route.methods.post && req.body) {
        await Usuario.update({
            nome: req.body.nome,
            cpf: req.body.cpf.replace(/[^\d]+/g, ''),
            matricula: req.body.matricula,
            sigla_curso: req.body.curso,
        }, {
            where: {
                matricula: req.user
            }
        }).then((usuario) => {
            if (usuario && usuario.length > 0 && usuario[0] !== 0) {
                console.log('Update conta');
                res.cookie('Authorization', auth.generateAccessToken({ matricula: req.body.matricula }));
                res.cookie('user', req.body.matricula);
                res.status(200).send({});
            } else {
                console.log('Usuario não encontrado');
                res.status(500).send({});
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        });
    }
}

const atualizar_email = async (req, res) => {
    if (req.route.methods.post && req.body) {
        await Usuario.update({
            email: req.body.novo_email
        }, {
            where: {
                email: req.body.email_atual
            }
        }).then((usuario) => {
            if (usuario && usuario.length > 0 && usuario[0] !== 0) {
                console.log('Update email');
                res.status(200).send({});
            } else {
                console.log('E-mail não encontrado');
                res.status(500).send({error: 'E-mail não encontrado'});
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        });
    }
}

const atualizar_senha = async (req, res) => {
    if (req.route.methods.post && req.body) {
        await Usuario.findOne({
            where: {
                matricula: req.user,
            }
        }).then((user) => {
            if (user) {
                bcrypt.compare(req.body.senha_atual, user.senha, (err, ok) => {
                    if (ok) {
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.nova_senha, salt, async (err, hash) => {
                                if (!err) {
                                    await Usuario.update({
                                        senha: hash,
                                    }, {
                                        where: {
                                            cpf: user.cpf
                                        }
                                    }).then((sucess) => {
                                        console.log('Senha alterada com sucesso');
                                        res.status(200).send({ message: 'Senha alterada com sucesso' });
                                    }).catch((error) => {
                                        console.log('Erro ao alterar a senha');
                                        console.log(error.parent.sqlMessage);
                                        res.status(500).send({ error: error.parent.sqlMessage });
                                    });
                                } else {
                                    console.log('error in bcrypt:' + err);
                                    res.status(500).send({ err: err });
                                }
                            });
                        })
                    } else {
                        console.log('Senha incorreta');
                        res.status(500).send({ error: 'Senha incorreta' });
                    }
                });
            } else {
                console.log('Usuario não encontrado');
                res.status(500).send({ error: 'Usuario não encontrado' });
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        })
    }
}

module.exports = {
    tutores,
    usuario,
    atualizar_conta,
    atualizar_email,
    atualizar_senha
}