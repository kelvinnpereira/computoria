const models = require('../models/index');
const Usuario = models.usuario;
const Ajuda = models.ajuda;
const Disponibilidade = models.disponibilidade;
const Disciplina = models.disciplina;
const Sequelize = require('sequelize');
const sequelize = models.sequelize;
const Op = Sequelize.Op;

const ajuda = async (req, res) => {
  if (req.route.methods.get && req.params.id) {
    const matricula = req.params?.matricula ? req.params.matricula : req.matricula;
    const usuario = await Usuario.findOne({
      where: {
        matricula: matricula,
      }
    });
    const ajuda = await sequelize.query(`
      SELECT 
        id, 
        disciplina.nome as disciplina, 
        sigla_disciplina, 
        status,
        usuario1.nome as nome_tutor,
        usuario2.nome as nome_aluno,
        usuario1.matricula as matricula_tutor,
        usuario2.matricula as matricula_aluno,
        data_inicio, 
        data_fim
      FROM
        ajuda,
        usuario as usuario1,
        usuario as usuario2,
        disciplina
      WHERE
        id = ${req.params.id} AND
        (ajuda.tutor = ${usuario.cpf} OR ajuda.aluno = ${usuario.cpf}) AND
        ajuda.tutor = usuario1.cpf AND 
        ajuda.aluno = usuario2.cpf AND 
        disciplina.sigla = ajuda.sigla_disciplina;
    `);
    console.log('get ajuda');
    res.status(200).send({ ajuda: ajuda?.at(0)?.at(0) });
  } else {
    res.status(500).send({ error: 'sem parametros matricula' });
  }
}

const agenda = async (req, res) => {
  if (req.route.methods.get) {
    const matricula = req.params?.matricula ? req.params.matricula : req.matricula;
    const usuario = await Usuario.findOne({
      where: {
        matricula: matricula,
      }
    });
    await Ajuda.update({
      status: 'concluida'
    }, {
      where: {
        data_fim: {
          [Op.lt]: new Date(),
        }
      }
    });
    let agenda = await sequelize.query(`
      SELECT 
        id, 
        disciplina.nome as disciplina, 
        sigla_disciplina, 
        status,
        usuario1.nome as nome_tutor,
        usuario2.nome as nome_aluno,
        usuario1.matricula as matricula_tutor,
        usuario2.matricula as matricula_aluno,
        data_inicio, 
        data_fim,
        nota_aluno,
        nota_tutor,
        comentario_aluno,
        comentario_tutor
      FROM
        ajuda,
        usuario as usuario1,
        usuario as usuario2,
        disciplina
      WHERE
        (
          (ajuda.tutor = ${usuario.cpf} AND ajuda.tutor = usuario1.cpf AND ajuda.aluno = usuario2.cpf) OR 
          (ajuda.aluno = ${usuario.cpf} AND ajuda.aluno = usuario2.cpf AND ajuda.tutor = usuario1.cpf)
        ) AND 
        disciplina.sigla = ajuda.sigla_disciplina;
    `);
    console.log('Listar agenda');
    res.status(200).send({ agenda: agenda?.at(0) });
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
      status: 'solicitada',
      data_inicio: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_inicio}`),
      data_fim: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_fim}`),
    }).then(() => {
      res.status(200).send({ msg: 'ok' });
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

const aceitar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({
      where: {
        matricula: req.matricula,
      }
    });
    await Ajuda.update({
      status: 'agendada',
    }, {
      where: {
        id: req.body?.id,
        tutor: usuario.cpf
      }
    }).then((ajuda) => {
      if (ajuda) {
        console.log('Ajuda encontrada');
        res.status(200).send({ msg: 'ok' });
      } else {
        console.log('Ajuda não vinculada ao seu nome');
        res.status(500).send({ error: 'Ajuda não vinculada ao seu nome' });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: 'error' });
    })
  } else {
    console.log('Não é um post ou req.body nulo');
    res.status(500).send({ error: 'error' });
  }
}

const recusar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({
      where: {
        matricula: req.matricula,
      }
    })
    await Ajuda.update({
      status: 'recusada',
    }, {
      where: {
        id: req.body?.id,
        tutor: usuario.cpf
      }
    }).then((ajuda) => {
      if (ajuda) {
        res.status(200).send({ msg: 'ok' });
      } else {
        res.status(500).send({ error: 'Ajuda não vinculada ao seu nome' });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error' });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const aluno_cancelar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({
      where: {
        matricula: req.matricula,
      }
    })
    await Ajuda.update({
      status: 'cancelada',
    }, {
      where: {
        id: req.body?.id,
        aluno: usuario.cpf
      }
    }).then((ajuda) => {
      if (ajuda) {
        res.status(200).send({ msg: 'ok' });
      } else {
        res.status(500).send({ error: 'Ajuda não vinculada ao seu nome' });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error' });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const tutor_cancelar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({
      where: {
        matricula: req.matricula,
      }
    })
    await Ajuda.update({
      status: 'cancelada',
    }, {
      where: {
        id: req.body?.id,
        tutor: usuario.cpf
      }
    }).then((ajuda) => {
      if (ajuda) {
        res.status(200).send({ msg: 'ok' });
      } else {
        res.status(500).send({ error: 'Ajuda não vinculada ao seu nome' });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error' });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const aluno_reagendar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula } });
    const ajuda = await Ajuda.findOne({ where: { id: req.body?.id, aluno: usuario.cpf }, });
    if (ajuda) {
      ajuda.status = 'cancelada';
      await ajuda.save();
    } else {
      return res.status(500).send({ error: 'error' });;
    }
    const array = req.body.dia.split('-')
    await Ajuda.create({
      tutor: ajuda.tutor,
      aluno: ajuda.aluno,
      sigla_disciplina: ajuda.sigla_disciplina,
      status: 'solicitada',
      data_inicio: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_inicio}`),
      data_fim: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_fim}`),
    }).then(() => {
      res.status(200).send({ msg: 'ok' });
    }).catch((error) => {
      console.log(error.parent.sqlMessage);
      res.status(500).send({ error: error.parent.sqlMessage });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const tutor_reagendar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula } });
    const ajuda = await Ajuda.findOne({ where: { id: req.body?.id, tutor: usuario.cpf }, });
    if (ajuda) {
      ajuda.status = 'cancelada';
      await ajuda.save();
    } else {
      return res.status(500).send({ error: 'error' });;
    }
    const array = req.body.dia.split('-')
    await Ajuda.create({
      tutor: ajuda.tutor,
      aluno: ajuda.aluno,
      sigla_disciplina: ajuda.sigla_disciplina,
      status: 'agendada',
      data_inicio: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_inicio}`),
      data_fim: new Date(`${array[2]}-${array[1]}-${array[0]}T${req.body.hora_fim}`),
    }).then(() => {
      res.status(200).send({ msg: 'ok' });
    }).catch((error) => {
      console.log(error.parent.sqlMessage);
      res.status(500).send({ error: error.parent.sqlMessage });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const avaliar = async (req, res) => {
  if (req.route.methods.post && req.body) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula } });
    const ajuda = await Ajuda.findOne({ where: { id: req.body?.id, }, });
    let update = {};
    console.log(req.body);
    if (ajuda.tutor === usuario.cpf && ajuda.nota_tutor === null) {
      update = {
        nota_tutor: parseInt(req.body.nota),
        comentario_tutor: req.body.comentario,
      };
    } else if (ajuda.aluno === usuario.cpf && ajuda.nota_aluno === null) {
      update = {
        nota_aluno: parseInt(req.body.nota),
        comentario_aluno: req.body.comentario,
      };
    } else {
      return res.status(500).send({ error: 'Usuario não pode avaliar essa ajuda' });
    }
    console.log(update);
    await Ajuda.update(update, {
      where: {
        id: req.body?.id,
      }
    }).then((ajuda) => {
      console.log(ajuda);
      res.status(200).send({ msg: 'ok' });
    }).catch((error) => {
      console.log(error.parent.sqlMessage);
      res.status(500).send({ error: error.parent.sqlMessage });
    })
  } else {
    res.status(500).send({ error: 'error' });
  }
}

module.exports = {
  ajuda,
  agenda,
  agendar,
  listar_disponibilidade,
  adicionar_disponibilidade,
  aceitar,
  recusar,
  aluno_cancelar,
  tutor_cancelar,
  aluno_reagendar,
  tutor_reagendar,
  avaliar,
}