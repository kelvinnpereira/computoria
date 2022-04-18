const models = require('../models/index');
const sequelize = models.sequelize;
const Usuario = models.usuario;
const Denuncia = models.denuncia;
const bcrypt = require('bcryptjs');
const auth = require('./token_auth');

const tutores = async (req, res) => {
  if (req.route.methods.get) {
    const disciplina = req.params?.disciplina;
    await sequelize.query(`\
      SELECT
        c.nome AS curso, u.nome AS usuario, matricula, media
      FROM
        (SELECT 
          DISTINCT(cpf) AS cpf 
        FROM 
          especialidade 
        ${disciplina ? `WHERE sigla_disciplina = \'${disciplina}\'` : ''}) AS espec
        INNER JOIN
          usuario AS u
        ON
          espec.cpf = u.cpf
        INNER JOIN
          curso AS c
        ON
          sigla = sigla_curso
        LEFT JOIN
          (SELECT 
            tutor, 
            AVG(nota_aluno) AS media 
          FROM 
            ajuda
          WHERE 
            status = 'concluida' 
          GROUP BY tutor) AS ajuda_table
        ON
          tutor = u.cpf
      ;
    `).then((tutores) => {
      if (tutores?.at(0)?.length > 0) {
        console.log('Listar tutores');
        res.status(200).send({ tutores: tutores?.at(0) });
      } else {
        console.log('Tutores não encontrados');
        res.status(500).send({ tutores: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const monitores = async (req, res) => {
  if (req.route.methods.get) {
    const disciplina = req.params?.disciplina;
    await sequelize.query(`\
      SELECT
        c.nome AS curso, u.nome AS usuario, matricula, media
      FROM
        (SELECT 
          DISTINCT(cpf) AS cpf 
        FROM 
          monitor 
        WHERE
          status = "aprovado"
        ${disciplina ? ` AND sigla_disciplina = \'${disciplina}\'` : ''}) AS monitor_tb
        INNER JOIN
          usuario AS u
        ON
          monitor_tb.cpf = u.cpf
        INNER JOIN
          curso AS c
        ON
          sigla = sigla_curso
        LEFT JOIN
          (SELECT 
            tutor, 
            AVG(nota_aluno) AS media 
          FROM 
            ajuda
          WHERE 
            status = 'concluida' 
          GROUP BY tutor) AS ajuda_table
        ON
          tutor = u.cpf
      ;
    `).then((monitores) => {
      if (monitores?.at(0)?.length > 0) {
        console.log('Listar monitores');
        res.status(200).send({ monitores: monitores?.at(0) });
      } else {
        console.log('monitores não encontrados');
        res.status(500).send({ monitores: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const tutores_por_disciplina = async (req, res) => {
  if (req.route.methods.get) {
    const disciplina = req.params?.disciplina;
    await sequelize.query(`\
    SELECT 
      curso, 
      usuario, 
      matricula, 
      categoria, 
      disciplina, 
      IFNULL(pontuacao, 0) AS pontuacao,
      IFNULL(media, 0) AS media
    FROM 
      (SELECT
        c.nome AS curso, 
        u.nome AS usuario, 
        matricula,
        cat.nome AS categoria,
        d.nome AS disciplina,
        especialidade.sigla_disciplina as especialidade_sigla,
        u.cpf AS cpf_user 
      FROM
        especialidade, 
        disciplina AS d, 
        categoria AS cat,
        usuario AS u,
        curso AS c
      WHERE
        id_categoria = cat.id AND 
        especialidade.sigla_disciplina = d.sigla AND
        especialidade.cpf = u.cpf AND
        c.sigla = sigla_curso 
        ${disciplina ? `AND sigla_disciplina = \'${disciplina}\'` : ''}
        ) AS user 
    LEFT JOIN
      (SELECT 
        dificuldade.sigla_disciplina AS dif_sigla, 
        COUNT(dificuldade.sigla_disciplina) AS pontuacao  
      FROM dificuldade) AS dif 
    ON 
      dif_sigla = especialidade_sigla
    LEFT JOIN
      (SELECT 
        tutor, 
        AVG(nota_aluno) AS media 
      FROM 
        ajuda 
      WHERE 
        status = 'concluida' 
      GROUP BY tutor) AS ajuda_table
    ON
      tutor = cpf_user
      ;
    `).then((tutores) => {
      if (tutores?.at(0)?.length > 0) {
        console.log('Listar tutores');
        res.status(200).send({ tutores: tutores?.at(0) });
      } else {
        console.log('Tutores não encontrados');
        res.status(500).send({ tutores: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const monitores_por_disciplina = async (req, res) => {
  if (req.route.methods.get) {
    const disciplina = req.params?.disciplina;
    await sequelize.query(`\
    SELECT 
      curso, 
      usuario, 
      matricula, 
      categoria, 
      disciplina, 
      IFNULL(pontuacao, 0) AS pontuacao,
      IFNULL(media, 0) AS media
    FROM 
      (SELECT
        c.nome AS curso, 
        u.nome AS usuario, 
        matricula,
        cat.nome AS categoria,
        d.nome AS disciplina,
        monitor.sigla_disciplina as monitor_sigla,
        u.cpf AS cpf_user 
      FROM
        monitor, 
        disciplina AS d, 
        categoria AS cat,
        usuario AS u,
        curso AS c
      WHERE
        id_categoria = cat.id AND 
        monitor.sigla_disciplina = d.sigla AND
        monitor.cpf = u.cpf AND
        c.sigla = sigla_curso AND
        monitor.status = "aprovado"
        ${disciplina ? `AND sigla_disciplina = \'${disciplina}\'` : ''}
        ) AS user 
    LEFT JOIN
      (SELECT 
        dificuldade.sigla_disciplina AS dif_sigla, 
        COUNT(dificuldade.sigla_disciplina) AS pontuacao  
      FROM dificuldade) AS dif 
    ON 
      dif_sigla = monitor_sigla
    LEFT JOIN
      (SELECT 
        tutor, 
        AVG(nota_aluno) AS media 
      FROM 
        ajuda 
      WHERE 
        status = 'concluida' 
      GROUP BY tutor) AS ajuda_table
    ON
      tutor = cpf_user
      ;
    `).then((monitores) => {
      if (monitores?.at(0)?.length > 0) {
        console.log('Listar monitores');
        res.status(200).send({ monitores: monitores?.at(0) });
      } else {
        console.log('monitores não encontrados');
        res.status(500).send({ monitores: [] });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    res.status(500).send({ error: 'error' });
  }
}

const usuario = async (req, res) => {
  if (req.route.methods.get) {
    const [attributes, matricula] = req.params?.matricula
      ?
      [['nome', 'matricula', 'email', 'sigla_curso',], req.params?.matricula]
      :
      [{ exclude: ['senha'] }, req.matricula];
    await Usuario.findOne({
      attributes: attributes,
      where: {
        matricula: matricula
      }
    }).then((usuario) => {
      if (usuario) {
        console.log('Get usuario ' + usuario);
        res.status(200).send({ usuario: usuario });
      } else {
        console.log('Usuario não encontrado');
        res.status(500).send({ usuario: usuario });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  } else {
    console.log('Sem usuario na query');
    res.status(500).send({ error: 'error' });
  }
}

const atualizar_conta = async (req, res) => {
  if (req.route.methods.post && req.body) {
    await Usuario.update({
      nome: req.body.nome,
      cpf: req.body.cpf.replace(/[^\d]+/g, ''),
      matricula: req.body.matricula,
      sigla_curso: req.body.curso,
    }, {
      where: {
        matricula: req.matricula
      }
    }).then((usuario) => {
      if (usuario && usuario.length > 0 && usuario[0] !== 0) {
        console.log('Update conta');
        res.cookie('Authorization', auth.generateAccessToken({
          matricula: req.body.matricula,
          cargo: usuario.cargo,
        }));
        res.cookie('matricula', req.body.matricula);
        res.status(200).send({});
      } else {
        console.log('Usuario não encontrado');
        res.status(500).send({});
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  }
}

const atualizar_email = async (req, res) => {
  if (req.route.methods.post && req.body) {
    await Usuario.update({
      email: req.body.novo_email
    }, {
      where: {
        email: req.body.email_atual
      }
    }).then((usuario) => {
      if (usuario && usuario.length > 0 && usuario[0] !== 0) {
        console.log('Update email');
        res.status(200).send({});
      } else {
        console.log('E-mail não encontrado');
        res.status(500).send({ error: 'E-mail não encontrado' });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    });
  }
}

const atualizar_senha = async (req, res) => {
  if (req.route.methods.post && req.body) {
    await Usuario.findOne({
      where: {
        matricula: req.matricula,
      }
    }).then((usuario) => {
      if (usuario) {
        bcrypt.compare(req.body.senha_atual, usuario.senha, (err, ok) => {
          if (ok) {
            bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(req.body.nova_senha, salt, async (err, hash) => {
                if (!err) {
                  await Usuario.update({
                    senha: hash,
                  }, {
                    where: {
                      cpf: usuario.cpf
                    }
                  }).then((sucess) => {
                    console.log('Senha alterada com sucesso');
                    res.status(200).send({ message: 'Senha alterada com sucesso' });
                  }).catch((error) => {
                    console.log('Erro ao alterar a senha');
                    console.log(error.parent.sqlMessage);
                    res.status(500).send({ error: error.parent.sqlMessage });
                  });
                } else {
                  console.log('error in bcrypt:' + err);
                  res.status(500).send({ err: err });
                }
              });
            })
          } else {
            console.log('Senha incorreta');
            res.status(500).send({ error: 'Senha incorreta' });
          }
        });
      } else {
        console.log('Usuario não encontrado');
        res.status(500).send({ error: 'Usuario não encontrado' });
      }
    }).catch((error) => {
      console.log(error);
      res.status(500).send({ error: error });
    })
  }
}

const denunciar = async (req, res) => {
  if (req.route.methods.post && req.body && req.params?.matricula) {
    const user1 = await Usuario.findOne({ where: { matricula: req.params.matricula } });
    const user2 = await Usuario.findOne({ where: { matricula: req.matricula } });
    if (user1 && user2) {
      await Denuncia.create({
        denunciado: user1.cpf,
        denunciador: user2.cpf,
        status: '',
        comentario: req.body.comentario
      }).then((denuncia) => {
        console.log('Denuncia enviada com sucesso');
        res.status(200).send({ message: 'Denuncia enviada com sucesso' });
      }).catch((error) => {
        console.log(error);
        res.status(500).send({ error: 'Usuario não encontrado' });
      });
    } else {
      res.status(500).send({ error: 'usuarios não encontrados' });
    }
  } else {
    res.status(500).send({ error: 'not logged in or no a get resquest' });
  }
}

module.exports = {
  tutores,
  tutores_por_disciplina,
  monitores,
  monitores_por_disciplina,
  usuario,
  atualizar_conta,
  atualizar_email,
  atualizar_senha,
  denunciar
}