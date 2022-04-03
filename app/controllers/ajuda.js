const models = require('../models/index');
const Usuario = models.usuario;
const Ajuda = models.ajuda;
const Disponibilidade = models.disponibilidade;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const listar_ajuda_tutor = async (req, res) => {
  if (req.route.methods.get && req.params?.matricula) {
    const matricula = req.params.matricula;
    const usuario = await Usuario.findOne({
      where: {
        matricula: matricula,
      }
    })
    await Ajuda.findAll({
      where: {
        tutor: usuario.cpf,
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
    res.status(500).send({ error: 'sem parametros matricula' });
  }
}

const listar_ajuda_aluno = async (req, res) => {
  if (req.route.methods.get && req.params?.matricula) {
    const matricula = req.params.matricula;
    const usuario = await Usuario.finOne({
      where: {
        matricula: matricula,
      }
    })
    await Ajuda.findAll({
      where: {
        aluno: usuario.cpf,
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
    res.status(500).send({ error: 'sem parametros matricula' });
  }
}

const agendar = async (req, res) => {
  if (req.route.methods.post) {
    const usuario1 = await Usuario.finOne({ where: { matricula: req.body?.tutor } })
    const usuario2 = await Usuario.finOne({ where: { matricula: req.matricula } })
    await Ajuda.create({
      tutor: usuario1.cpf,
      aluno: usuario2.cpf,
      sigla_disciplina: req.body.sigla_disciplina,
      status: 'solicitado',
      data_inicio: req.body.data_inicio,
      data_fim: req.body.data_fim,
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const listar_disponibilidade = async (req, res) => {
  if (req.route.methods.get) {
    const matricula = req.params?.matricula ? req.params.matricula : req.matricula;
    const usuario = await Usuario.findOne({
      where: {
        matricula: matricula
      }
    });
    await Disponibilidade.findAll({
      where: {
        cpf: usuario.cpf,
      }
    }).then((disponibilidade) => {
      console.log('disponibilidades encontradas');
      res.status(200).send({ horarios: disponibilidade });
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: 'error' })
    });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const adicionar_disponibilidade = async (req, res) => {
  if (req.route.methods.post) {
    const usuario = await Usuario.findOne({
      where: {
        matricula: req.matricula
      }
    });
    let horarios = [];
    req.body.dias.forEach((dia) => {
      req.body.horarios[parseInt(dia)].forEach((hora, i) => {
        horarios.push(
          {
            cpf: usuario.cpf,
            dia: dia,
            hora_indice: i,
            hora_inicio: hora.inicio,
            hora_fim: hora.fim,
          }
        )
      })
    })
    await Disponibilidade.destroy({
      where: {
        cpf: usuario.cpf,
      }
    });
    await Disponibilidade.bulkCreate(horarios);
    res.status(200).send({ msg: 'ok' });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

module.exports = {
  listar_ajuda_tutor,
  listar_ajuda_aluno,
  agendar,
  listar_disponibilidade,
  adicionar_disponibilidade,
}