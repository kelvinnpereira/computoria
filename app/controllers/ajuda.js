const models = require('../models/index');
const Usuario = models.usuario;
const Ajuda = models.ajuda;
const Disponibilidade = models.disponibilidade;
const Disciplina = models.disciplina;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const listar = async (req, res) => {
  if (req.route.methods.get) {
    const matricula = req.params?.matricula ? req.params?.matricula : req.matricula;
    const usuario = await Usuario.findOne({
      where: {
        matricula: matricula,
      }
    });
    const tutor = await Ajuda.findAll({
      where: {
        tutor: usuario.cpf,
        status: 'agendado',
      }
    })
    const aluno = await Ajuda.findAll({
      where: {
        aluno: usuario.cpf,
        status: 'agendado',
      }
    })
    const agenda = tutor.concat(aluno).map((item) => {
      return {
        tutor: item.tutor === usuario.cpf ? usuario.matricula : undefined,
        aluno: item.aluno === usuario.cpf ? usuario.matricula : undefined,
        data_inicio: item.data_inicio,
        data_fim: item.data_fim,
      }
    });
    console.log('Listar agenda');
    res.status(200).send({ agenda: agenda });
  } else {
    res.status(500).send({ error: 'sem parametros matricula' });
  }
}

const agendar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario1 = await Usuario.findOne({ where: { matricula: req.body?.tutor } })
    const usuario2 = await Usuario.findOne({ where: { matricula: req.matricula } })
    const disciplina = await Disciplina.findOne({
      where: {
        sigla: req.body.disciplina
      }
    })
    if (!disciplina) {
      return res.status(500).send({ error: 'Selecione uma disciplina' });
    }
    const array = req.body.dia.split('-')
    await Ajuda.create({
      tutor: usuario1.cpf,
      aluno: usuario2.cpf,
      sigla_disciplina: disciplina.sigla,
      status: 'agendado',
      data_inicio: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_inicio}`),
      data_fim: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_fim}`),
    }).then(() => {
      res.status(200).send({msg: 'ok'});
    }).catch((error) => {
      console.log(error.parent.sqlMessage);
      res.status(500).send({ error: error.parent.sqlMessage });
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
  listar,
  agendar,
  listar_disponibilidade,
  adicionar_disponibilidade,
}