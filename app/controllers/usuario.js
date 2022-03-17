const models = require('../models/index');
const sequelize = models.sequelize;

const usuario = async (req, res) => {
    if (req.session.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/auth/login');
    }
}

const api_usuario = async (req, res) => {
    if (req.query.user && req.route.methods.get) {
        handle(req, res);
    } else {
        res.redirect('/auth/login');
    }
}

const listar_tutores = async (req, res) => {
    if (req.query.user && req.route.methods.get) {
        await sequelize.query('\
            SELECT \
                c.nome as curso, u.nome as usuario, matricula  \
            FROM \
                    (select distinct(cpf) as cpf from proficiencia) as prof \
                INNER JOIN \
                    usuario as u \
                ON \
                    prof.cpf = u.cpf\
                INNER JOIN \
                    curso as c \
                ON \
                    sigla = sigla_curso\
            ;\
        ').then((tutores) => {
            if (tutores?.at(0)?.length > 0) {
                console.log(tutores?.at(0));
                res.status(200).send({tutores: tutores?.at(0)});
            } else {
                res.status(500).send({tutores: []});
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send({error: error});
        });
    }
}

module.exports = {
    usuario,
    api_usuario,
    listar_tutores,
}