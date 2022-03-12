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
    },
    email: {
      type: DataTypes.STRING,
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
  usuario.associate = function(models) {
    usuario.belongsTo(models.curso, {foreignKey: 'sigla_curso'});
  };
  return usuario;
};