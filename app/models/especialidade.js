'use strict';
module.exports = (sequelize, DataTypes) => {
  const especialidade = sequelize.define('especialidade', {
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
  especialidade.associate = function (models) {
    especialidade.belongsTo(models.disciplina, { foreignKey: 'sigla_disciplina' });
    especialidade.belongsTo(models.usuario, { foreignKey: 'cpf' });
  };
  return especialidade;
};