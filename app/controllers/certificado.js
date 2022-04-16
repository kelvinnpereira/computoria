const models = require('../models/index');
const Usuario = models.usuario;
const Ajuda = models.ajuda;
const Certificado = models.certificado;
const Monitor = models.monitor;
const sequelize = models.sequelize;

const horas = async (req, res) => {
  if (req.route.methods.get && req.body.sigla) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula, } });
    const ajudas = await sequelize.query(`
      SELECT
        COUNT(tutor) as horas,
        monitor.sigla_disciplina as disciplina
      FROM
        ajuda, monitor
      WHERE
        ajuda.tutor = monitor.cpf AND
        monitor.cpf = ${usuario.cpf} AND
        ajuda.status = "concluida" AND
        monitor.sigla_disciplina = ajuda.sigla_disciplina AND
        monitor.sigla_disciplina = "${req.body.sigla}"
      GROUP BY disciplina
      ;
    `);
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf, sigla_disciplina: req.body.sigla } });
    const horas = (ajudas?.at(0)?.at(0)?.horas ? ajudas.at(0).at(0).horas : 0) - certificados.length * 30;
    res.status(200).send({ horas: horas });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const listar = async (req, res) => {
  if (req.route.methods.get) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula, } });
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf } });
    res.status(200).send({ certificados: certificados });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const solicitar = async (req, res) => {
  if (req.route.methods.get && req.body.sigla) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula, } });
    const ajudas = await sequelize.query(`
      SELECT
        COUNT(tutor) as horas,
        monitor.sigla_disciplina as disciplina
      FROM
        ajuda, monitor
      WHERE
        ajuda.tutor = monitor.cpf AND
        monitor.cpf = ${usuario.cpf} AND
        ajuda.status = "concluida" AND
        monitor.sigla_disciplina = ajuda.sigla_disciplina AND
        monitor.sigla_disciplina = "${req.body.sigla}"
      GROUP BY disciplina
      ;
    `);
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf, sigla_disciplina: req.body.sigla } });
    const horas = (ajudas?.at(0)?.at(0)?.horas ? ajudas.at(0).at(0).horas : 0) - certificados.length * 30;
    if (horas >= 30) {
      await Certificado.create({
        monitor: usuario.cpf,
        sigla_disciplina: req.body.sigla,
      });
      res.status(200).send({ msg: 'ok' });
    } else {
      res.status(500).send({ error: 'Monitor não tem horas suficientes' });
    }
    res.status(200).send({ certificados: certificados });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

module.exports = {
  horas,
  listar,
  solicitar,
}