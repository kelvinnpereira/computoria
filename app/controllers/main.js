const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Usuario = models.usuario;
const Curso = models.curso;
const Disciplina = models.disciplina;
const DisciplinaCurso = models.disciplina_curso;
const Proficiencia = models.proficiencia;
const Improficiencia = models.improficiencia;

const cursos = async (req, res) => {
    if (req.route.methods.get) {
        let curso = await Curso.findAll();
        return res.status(200).send({ cursos: curso });
    }
    return res.status(500);
}

const disciplinas = async (req, res) => {
    if (req.route.methods.get) {
        let disciplinas;
        if (req.params?.curso) {
            await Curso.findByPk(
                req.params.curso
            ).then(async (sucess) => {
                if (sucess) {
                    disciplinas = await Disciplina.findAll({
                        where: {
                            sigla: {
                                [Op.eq]: Sequelize.col('sigla_disciplina')
                            }
                        },
                        include: {
                            model: DisciplinaCurso,
                            attributes: [],
                            where: {
                                sigla_curso: {
                                    [Op.eq]: req.params.curso
                                }
                            }
                        }
                    });
                    console.log('Disciplinas encontradas');
                    res.status(200).send({ disciplinas: disciplinas });
                } else {
                    console.log('Curso não encontrado');
                    res.status(500).send({ error: 'Curso não encontrado' });
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send({ error: error });
            });
        } else {
            disciplina = await Disciplina.findAll();
            res.status(200).send({ disciplina: disciplina });
        }
    } else {
        res.status(500);
    }
}

const api_proficiencia = async (req, res) => {
    if (req.route.methods.get && req.params?.matricula) {
        const user = await Usuario.findOne({
            where: {
                matricula: req.params.matricula
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Proficiencia,
                attributes: [],
                where: {
                    cpf: {
                        [Op.eq]: user.cpf
                    }
                }
            }
        }).then((disciplinas) => {
            res.status(200).send({ disciplinas: disciplinas });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: error });
        });
    } else {
        res.status(500).send({error: 'Not loged in or not a get request'});
    }
}

const api_proficiencia_adicionar = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        if (req.body.disciplinas.length > 10) {
            return res.status(500).send({error: 'Muitas disciplinas selecionadas'});
        }
        const user = await Usuario.findOne({
            where: {
                matricula: req.user
            }
        });
        await Proficiencia.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: user.cpf,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Umas das disciplinas selecionadas já estão em sua lista de proficiência' })
        });
    } else {
        res.status(500).send({error: 'Nenhuma disciplina selecionada'});
    }
}

const api_proficiencia_remover = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        const user = await Usuario.findOne({
            where: {
                matricula: req.user
            }
        });
        await Proficiencia.destroy({
            where: {
                cpf: user.cpf,
                sigla_disciplina: [
                    typeof req.body.disciplinas == 'string' ?
                    req.body.disciplinas :
                    req.body.disciplinas.map((value) => {
                        return value
                    })
                ]
            }
        }).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: 'Umas das disciplinas selecionadas não estão em sua lista de proficiência' })
        });
    } else {
        res.status(500).send({error: 'Nenhuma disciplina selecionada'});
    }
}

const api_improficiencia = async (req, res) => {
    if (req.route.methods.get) {
        const user = await Usuario.findOne({
            where: {
                matricula: req.user
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Improficiencia,
                attributes: [],
                where: {
                    cpf: {
                        [Op.eq]: user.cpf
                    }
                }
            }
        }).then((disciplinas) => {
            res.status(200).send({ disciplinas: disciplinas });
        });
    } else {
        res.status(500).send({error: 'Not loged in or not a get request'});
    }
}

const api_improficiencia_adicionar = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        if (req.body.disciplinas.length > 10) {
            return res.status(500).send({error: 'Muitas disciplinas selecionadas'});
        }
        const user = await Usuario.findOne({
            where: {
                matricula: req.user
            }
        });
        await Improficiencia.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: user.cpf,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Umas das disciplinas selecionadas já estão em sua lista de improficiência' })
        });
    } else {
        res.status(500).send({error: 'Nenhuma disciplina selecionada'});
    }
}

const api_improficiencia_remover = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        const user = await Usuario.findOne({
            where: {
                matricula: req.user
            }
        });
        await Improficiencia.destroy({
            where: {
                cpf: user.cpf,
                sigla_disciplina: [
                    typeof req.body.disciplinas == 'string' ?
                    req.body.disciplinas :
                    req.body.disciplinas.map((value) => {
                        return value
                    })
                ]
            }
        }).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: 'Umas das disciplinas selecionadas não estão em sua lista de improficiência' })
        });
    } else {
        res.status(500).send({error: 'Nenhuma disciplina selecionada'});
    }
}

module.exports = {
    cursos,
    disciplinas,
    api_proficiencia,
    api_proficiencia_adicionar,
    api_proficiencia_remover,
    api_improficiencia,
    api_improficiencia_adicionar,
    api_improficiencia_remover,
}
