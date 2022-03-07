const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Curso = models.curso;
const Disciplina = models.disciplina;
const DisciplinaCurso = models.disciplina_curso;

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

module.exports = {
    index: index,
    home: home,
    invalid: invalid,
    cursos: cursos,
    disciplinas: disciplinas
}
