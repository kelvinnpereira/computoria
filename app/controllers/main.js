const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Usuario = models.usuario;
const Curso = models.curso;
const Disciplina = models.disciplina;
const DisciplinaCurso = models.disciplina_curso;
const Especialidade = models.especialidade;
const Dificuldade = models.dificuldade;
const Monitor = models.monitor;
const sequelize = models.sequelize;

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

const api_especialidade = async (req, res) => {
    if (req.route.methods.get) {
        const matricula = req.params?.matricula ? req.params?.matricula : req.matricula
        const usuario = await Usuario.findOne({
            where: {
                matricula: matricula
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Especialidade,
                attributes: [],
                where: {
                    cpf: {
                        [Op.eq]: usuario.cpf
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
        res.status(500).send({ error: 'Not loged in or not a get request' });
    }
}

const api_especialidade_adicionar = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        if (req.body.disciplinas.length > 10) {
            return res.status(500).send({ error: 'Muitas disciplinas selecionadas' });
        }
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Especialidade.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: usuario.cpf,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Umas das disciplinas selecionadas já estão em sua lista de especialidades' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada' });
    }
}

const api_especialidade_remover = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Especialidade.destroy({
            where: {
                cpf: usuario.cpf,
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
            res.status(500).send({ error: 'Umas das disciplinas selecionadas não estão em sua lista de especialidades' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada' });
    }
}

const api_dificuldade = async (req, res) => {
    if (req.route.methods.get) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Dificuldade,
                attributes: [],
                where: {
                    cpf: {
                        [Op.eq]: usuario.cpf
                    }
                }
            }
        }).then((disciplinas) => {
            res.status(200).send({ disciplinas: disciplinas });
        });
    } else {
        res.status(500).send({ error: 'Not loged in or not a get request' });
    }
}

const api_dificuldade_adicionar = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        if (req.body.disciplinas.length > 10) {
            return res.status(500).send({ error: 'Muitas disciplinas selecionadas' });
        }
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Dificuldade.bulkCreate(
            req.body.disciplinas.map((value) => {
                return {
                    cpf: usuario.cpf,
                    sigla_disciplina: value
                }
            })
        ).then(() => {
            res.status(200).send({ msg: 'ok' });
        }).catch(() => {
            res.status(500).send({ error: 'Umas das disciplinas selecionadas já estão em sua lista de dificuldades' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada' });
    }
}

const api_dificuldade_remover = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplinas) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Dificuldade.destroy({
            where: {
                cpf: usuario.cpf,
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
            res.status(500).send({ error: 'Umas das disciplinas selecionadas não estão em sua lista de dificuldades' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada' });
    }
}

const monitoria_inscrever = async (req, res) => {
    if (req.route.methods.post && req.body?.disciplina) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        const pendencias = await Monitor.findAll({
            where: {
                cpf: usuario.cpf,
                status: 'solicitado',
            }
        })
        if (pendencias.length == 0) {
            await Monitor.create({
                cpf: usuario.cpf,
                sigla_disciplina: req.body?.disciplina
            }).then(() => {
                res.status(200).send({ msg: 'ok' });
            }).catch(() => {
                res.status(500).send({ error: 'Umas das disciplinas selecionadas já estão em sua lista de especialidades!' })
            });
        } else {
            res.status(500).send({ error: 'Você tem solicitações de monitoria pendentes!' })
        }
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada!' });
    }
}

const monitoria_listar = async (req, res) => {
    if (req.route.methods.get) {
        const matricula = req.params?.matricula ? req.params?.matricula : req.matricula;
        const usuario = await Usuario.findOne({
            where: {
                matricula: matricula
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Monitor,
                attributes: [],
                where: {
                    cpf: usuario.cpf,
                    status: 'aprovado',
                }
            }
        }).then((disciplinas) => {
            res.status(200).send({ disciplinas: disciplinas });
        });
    } else {
        res.status(500).send({ error: 'Not loged in or not a get request' });
    }
}

const monitoria_solicitacoes_usuario = async (req, res) => {
    if (req.route.methods.get) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.matricula
            }
        });
        await Disciplina.findAll({
            where: {
                sigla: {
                    [Op.eq]: Sequelize.col('sigla_disciplina')
                }
            },
            include: {
                model: Monitor,
                attributes: [],
                where: {
                    cpf: usuario.cpf,
                    status: 'solicitado',
                }
            }
        }).then((pendencias) => {
            console.log('pendencias');
            res.status(200).send({ pendencias: pendencias });
        }).catch(() => {
            res.status(500).send({ error: '' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada!' });
    }
}

const monitoria_solicitacoes = async (req, res) => {
    if (req.route.methods.get) {
        await sequelize.query(`
            select 
                usuario.nome as nome,
                disciplina.nome as disciplina,
                disciplina.sigla as sigla,
                matricula
            from 
                disciplina, 
                monitor, 
                usuario
            where
                monitor.cpf = usuario.cpf and 
                monitor.sigla_disciplina = disciplina.sigla and 
                monitor.status = "solicitado";
        `).then((solicitacoes) => {
            console.log('pendencias encontradas');
            res.status(200).send({ solicitacoes: solicitacoes?.at(0) });
        }).catch((error) => {
            console.log(error);
            res.status(500).send({ error: '' })
        });
    } else {
        res.status(500).send({ error: 'Nenhuma disciplina selecionada!' });
    }
}

const monitoria_aceitar = async (req, res) => {
    if (req.route.methods.post && req.body) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.body.matricula
            }
        });
        await Monitor.update({
            status: 'aprovado'
        }, {
            where: {
                cpf: usuario.cpf,
                sigla_disciplina: req.body.sigla,
            }
        })
        res.status(200).send({ msg: 'ok' });
    } else {
        res.status(500).send({ error: 'error' });
    }
}

const monitoria_remover = async (req, res) => {
    if (req.route.methods.post && req.body) {
        const usuario = await Usuario.findOne({
            where: {
                matricula: req.body.matricula
            }
        });
        await Monitor.update({
            status: 'removido'
        }, {
            where: {
                cpf: usuario.cpf,
                sigla_disciplina: req.body.sigla,
            }
        })
        res.status(200).send({ msg: 'ok' });
    } else {
        res.status(500).send({ error: 'error' });
    }
}

const monitoria_listar_aprovados = async (req, res) => {
    if (req.route.methods.get) {
        await sequelize.query(`
            select
                usuario.nome as nome,
                disciplina.nome as disciplina,
                disciplina.sigla as sigla,
                matricula
            from
                disciplina,
                monitor,
                usuario
            where
                monitor.cpf = usuario.cpf AND 
                monitor.sigla_disciplina = disciplina.sigla AND 
                monitor.status = "aprovado";
        `).then((monitores) => {
            res.status(200).send({ monitores: monitores?.at(0) });
        }).catch((error) => {
            console.log('Erro')
            res.status(500).send({ error: '' })
        });
    } else {
        res.status(500).send({ error: 'Sem monitores cadastrados' });
    }
}

module.exports = {
    cursos,
    disciplinas,
    api_especialidade,
    api_especialidade_adicionar,
    api_especialidade_remover,
    api_dificuldade,
    api_dificuldade_adicionar,
    api_dificuldade_remover,
    monitoria_inscrever,
    monitoria_listar,
    monitoria_aceitar,
    monitoria_remover,
    monitoria_solicitacoes,
    monitoria_solicitacoes_usuario,
    monitoria_listar_aprovados,
}
