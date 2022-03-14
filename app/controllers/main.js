const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Curso = models.curso;
const Disciplina = models.disciplina;
const DisciplinaCurso = models.disciplina_curso;
const Proficiencia = models.proficiencia;
const Improficiencia = models.improficiencia;

const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();

const index = async function (req, res) {
    res.redirect('/home');
};

const home = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/auth/login');
    }
}

const invalid = async (req, res) => {
    if (!req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/home');
    }
}

const proficiencia = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/home');
    }
}

const improficiencia = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/home');
    }
}

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
                    res.status(200).send({ disciplinas: disciplinas });
                } else {
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
    }
    res.status(500);
}

const api_proficiencia = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
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
                        [Op.eq]: req.session.user
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
        res.status(500);
    }
}

const api_proficiencia_adicionar = async (req, res) => {
    if (req.session.user && req.route.methods.post && req.body?.disciplinas) {
        await Proficiencia.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: req.session.user,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Uma das disciplinas selecionadas já estão em sua lista de proficiencia' })
        });
    } else {
        res.status(500);
    }
}

const api_proficiencia_remover = async (req, res) => {
    if (req.session.user && req.route.methods.post && req.body?.disciplinas) {
        await Proficiencia.destroy({
            where: {
                cpf: req.session.user,
                sigla_disciplina: [req.body.disciplinas.map((value) => {
                    return value
                })]
            }
        }).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: 'Uma das disciplinas selecionadas já estão em sua lista de proficiencia' })
        });
    } else {
        res.status(500);
    }
}

const api_improficiencia = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
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
                        [Op.eq]: req.session.user
                    }
                }
            }
        }).then((disciplinas) => {
            res.status(200).send({ disciplinas: disciplinas });
        });
    } else {
        res.status(500);
    }
}

const api_improficiencia_adicionar = async (req, res) => {
    if (req.session.user && req.route.methods.post && req.body?.disciplinas) {
        await Improficiencia.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: req.session.user,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Uma das disciplinas selecionadas já estão em sua lista de proficiencia' })
        });
    } else {
        res.status(500);
    }
}

const api_improficiencia_remover = async (req, res) => {
    if (req.session.user && req.route.methods.post && req.body?.disciplinas) {
        await Improficiencia.destroy({
            where: {
                cpf: req.session.user,
                sigla_disciplina: [req.body.disciplinas.map((value) => {
                    return value
                })]
            }
        }).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: 'Uma das disciplinas selecionadas já estão em sua lista de proficiencia' })
        });
    } else {
        res.status(500);
    }
}

module.exports = {
    index: index,
    home: home,
    invalid: invalid,
    cursos: cursos,
    disciplinas: disciplinas,
    proficiencia: proficiencia,
    improficiencia: improficiencia,
    api_proficiencia: api_proficiencia,
    api_proficiencia_adicionar: api_proficiencia_adicionar,
    api_proficiencia_remover: api_proficiencia_remover,
    api_improficiencia: api_improficiencia,
    api_improficiencia_adicionar: api_improficiencia_adicionar,
    api_improficiencia_remover: api_improficiencia_remover,
}
