'use strict';
module.exports = (sequelize, DataTypes) => {
  const dificuldade = sequelize.define('dificuldade', {
    sigla_disciplina: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    cpf: {
      primaryKey: true,
      type: DataTypes.STRING
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  dificuldade.associate = function (models) {
    dificuldade.belongsTo(models.disciplina, { foreignKey: 'sigla_disciplina' });
    dificuldade.belongsTo(models.usuario, { foreignKey: 'cpf' });
  };
  return dificuldade;
};