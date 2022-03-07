const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Curso = models.curso;
const Disciplina = models.disciplina;
const DisciplinaCurso = models.disciplina_curso;
const Proficiencia = models.proficiencia;
const Improficiencia = models.improficiencia;

const next = require('next');
const dev = process.env.NODE_ENV?.trim() == 'development';
const app = next({dev});
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
    if (!req.session.user && req.route.methods.get){
        handle(req, res);
    } else {
        res.redirect('/home');
    }
}

const cursos = async (req, res) => {
    if (req.route.methods.get) {
        let curso = await Curso.findAll();
        return res.status(200).send({curso: curso});
    }
    return res.status(500);
}

const disciplinas = async (req, res) => {
    if (req.route.methods.get) {
        let disciplina;
        if (req.params?.curso) {
            await Curso.findByPk(
                req.params.curso
            ).then(async (sucess) => {
                if (sucess) {
                    disciplina = await Disciplina.findAll({
                        where: {
                            sigla: {
                                [Op.eq]: Sequelize.col('sigla_disciplina')
                            }
                        },
                        include: {
                            model: DisciplinaCurso,
                            attributes: [],
                            where : {
                                sigla_curso: {
                                    [Op.eq]: req.params.curso
                                }
                            }
                        }
                    });
                    res.status(200).send({disciplina: disciplina});
                } else {
                    res.status(500).send({error: 'Curso não encontrado'});
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send({error: error});
            });
        } else {
            disciplina = await Disciplina.findAll();
            res.status(200).send({disciplina: disciplina});
        }
    }
    res.status(500);
}

const proficiencia = async (req, res) => {
    if (req.session.user) {
        if (req.route.methods.get) {
            await Disciplina.findAll({
                where: {
                    sigla: {
                        [Op.eq]: Sequelize.col('sigla_disciplina')
                    }
                },
                include: {
                    model: Proficiencia,
                    attributes: [],
                    where : {
                        cpf: {
                            [Op.eq]: req.session.user
                        }
                    }
                }
            }).then((proficiencia) => {
                res.status(200).send({proficiencia: proficiencia});
            });
        } else if (req.route.methods.post) {
            await Proficiencia.bulkCreate(
                req.body.disciplinas.map((value) => {
                    return {
                        cpf: req.session.user,
                        sigla_disciplina: value
                    }
                })
            )
        } else {
            res.status(500);
        }
    } else {
        res.status(500);
    }
}

const improficiencia = async (req, res) => {
    if (req.session.user) {
        if (req.route.methods.get) {
            await Disciplina.findAll({
                where: {
                    sigla: {
                        [Op.eq]: Sequelize.col('sigla_disciplina')
                    }
                },
                include: {
                    model: Improficiencia,
                    attributes: [],
                    where : {
                        cpf: {
                            [Op.eq]: req.session.user
                        }
                    }
                }
            }).then((improficiencia) => {
                res.status(200).send({improficiencia: improficiencia});
            });
        } else if (req.route.methods.post) {
            await Improficiencia.bulkCreate(
                req.body.disciplinas.map((value) => {
                    return {
                        cpf: req.session.user,
                        sigla_disciplina: value
                    }
                })
            )
        } else {
            res.status(500);
        }
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
    improficiencia: improficiencia
}
