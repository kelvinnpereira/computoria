'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    nome: {
      type: DataTypes.STRING,
    },
    cpf: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Este número de matrícula já está em uso!'
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Este E-mail já está em uso!'
      },
    },
    senha: {
      type: DataTypes.STRING,
    },
    sigla_curso: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    freezeTableName: true,
  });
  admin.associate = function (models) {
    admin.hasMany(models.mudar_senha_admin, {foreignKey: 'cpf'});
  };
  return admin;
};