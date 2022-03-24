const models = require('../models/index');
const Ajuda = models.ajuda;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const listar_ajuda_tutor = async (req, res) => {
  if (req.route.methods.get && req.params?.user) {
    const user = req.params.user;
    await Ajuda.findAll({
      where: {
        tutor: user,
        status: 'agendado',
      },
    }).then((agenda) => {
      if (agenda) {
        console.log('Listar agenda do tutor');
        res.status(200).send({ agenda: agenda });
      } else {
        console.log('agenda do tutor não encontrada');
        res.status(500).send({ agenda: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'sem parametros user' });
  }
}

const listar_ajuda_aluno = async (req, res) => {
  if (req.route.methods.get && req.params?.user) {
    const user = req.params.user;
    await Ajuda.findAll({
      where: {
        aluno: user,
        status: 'agendado',
      },
    }).then((agenda) => {
      if (agenda) {
        console.log('Listar agenda do aluno');
        res.status(200).send({ agenda: agenda });
      } else {
        console.log('agenda do aluno não encontrada');
        res.status(500).send({ agenda: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'sem parametros user' });
  }
}

const agendar = async (req, res) => {
  if (req.route.methods.post && req.body && req.body?.aluno === req.user) {
    await Ajuda.create({
      tutor: req.body.tutor,
      aluno: req.body.aluno,
      sigla_disciplina: req.body.sigla_disciplina,
      status: 'solicitado',
      data_inicio: req.body.data_inicio,
      data_fim: req.body.data_fim,
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}


module.exports = {
  listar_ajuda_tutor,
  listar_ajuda_aluno,
  agendar,
}