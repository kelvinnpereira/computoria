'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('user', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'O nome precisa ter entre 6 e 100 caracteres.'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [11],
          msg: 'O cpf precisa ter 11 caracteres.'
        }
      }
    },
    matricula: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: 'O cpf precisa ter 8 matricula.'
        }
      }
    },
    email: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'A senha precisa ter mais que 6 caracteres.'
        }
      }
    },
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  usuario.associate = function(models) {
    usuario.belongsTo(models.curso,    {foreignKey: 'id_curso' , as: 'id_curso_fk'});
  };
  return usuario;
};