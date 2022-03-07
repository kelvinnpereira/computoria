'use strict';
module.exports = (sequelize, DataTypes) => {
  const improficiencia = sequelize.define('improficiencia', {
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
  improficiencia.associate = function(models) {
    improficiencia.belongsTo(models.disciplina, {foreignKey: 'sigla_disciplina'});
    improficiencia.belongsTo(models.usuario, {foreignKey: 'cpf'});
  };
  return improficiencia;
};