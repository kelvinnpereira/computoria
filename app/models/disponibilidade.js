'use strict';
module.exports = (sequelize, DataTypes) => {
  const disponibilidade = sequelize.define('disponibilidade', {
    cpf: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    dia: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isIn: [[0, 1, 2, 3, 4, 5, 6]]
      },
    },
    hora_indice: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    hora_inicio: {
      type: DataTypes.STRING,
      validate: {
        is: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
      },
    },
    hora_fim: {
      type: DataTypes.STRING,
      validate: {
        is: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
      },
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  disponibilidade.associate = function (models) {
    disponibilidade.belongsTo(models.usuario, { foreignKey: 'cpf' });
  };
  return disponibilidade;
};