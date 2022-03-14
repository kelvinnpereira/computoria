'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
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
  usuario.associate = function (models) {
    usuario.belongsTo(models.curso, { foreignKey: 'sigla_curso' });
    usuario.hasMany(models.proficiencia, {foreignKey: 'cpf'});
    usuario.hasMany(models.improficiencia, {foreignKey: 'cpf'});
    usuario.hasMany(models.monitor, {foreignKey: 'cpf'});
  };
  return usuario;
};