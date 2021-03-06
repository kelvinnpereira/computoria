const models = require('../models/index');
const Usuario = models.usuario;
const Ajuda = models.ajuda;
const Certificado = models.certificado;
const Monitor = models.monitor;
const sequelize = models.sequelize;

const horas = async (req, res) => {
  console.log("HORAS")
  if (req.route.methods.get) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula, } });
    const ajudas = await sequelize.query(`
      SELECT
        COUNT(tutor) as horas
      FROM
        ajuda
      WHERE
        ajuda.tutor = ${usuario.cpf} AND
        ajuda.status = "concluida" 
      ;
    `);
    console.log('HORAS 1')
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf } });
    console.log('HORAS 2')
    const horas = (ajudas?.at(0)?.at(0)?.horas ? ajudas.at(0).at(0).horas : 0) - certificados.length * 30;
    console.log('HORAS 2')
    res.status(200).send({ horas: horas });
  } else {
    console.log('HORAS 3')
    res.status(500).send({ error: 'error' });
  }
}

const listar = async (req, res) => {
  console.log('LISTAR')
  if (req.route.methods.get) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula, } });
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf } });
    res.status(200).send({ certificados: certificados });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const solicitar = async (req, res) => {
  console.log('solicitar')
  if (req.route.methods.post) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula } });
    const ajudas = await sequelize.query(`
      SELECT
        COUNT(tutor) as horas
      FROM
        ajuda
      WHERE
        ajuda.tutor = ${usuario.cpf} AND
        ajuda.status = "concluida"
      ;
    `);
    const certificados = await Certificado.findAll({ where: { monitor: usuario.cpf } });
    const horas = (ajudas?.at(0)?.at(0)?.horas ? ajudas.at(0).at(0).horas : 0) - certificados.length * 30;

    if (horas >= 30) {
      await Certificado.create({
        monitor: usuario.cpf,
      });
      res.status(200).send({ msg: 'ok' });
    } else {
      res.status(500).send({ error: 'Monitor n??o tem horas suficientes' });
    }
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const exibir = async (req, res) => {
  console.log('exibir')
  if(req.route.methods.get && req.params?.id) {
    const usuario = await Usuario.findOne({ where: { matricula: req.matricula } });
    await Certificado.findOne({
      where: {
        id: req.params.id,
        monitor: usuario.cpf,
      }
    }).then((certificado) => {
      if(certificado) {
        res.status(200).send({certificado: certificado});
      }else {
        res.status(500).send({error: 'certificado n??o encontrado'});
      }
    }).catch((error) => {
      console.log(error)
      res.status(500).send({error: 'certificado n??o encontrado'});
    })
  } else {
    res.status(500).send({error: 'certificado n??o encontrado'});
  }
}

module.exports = {
  horas,
  listar,
  solicitar,
  exibir
}