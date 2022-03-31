'use strict';
module.exports = (sequelize, DataTypes) => {
  const monitor = sequelize.define('monitor', {
    sigla_disciplina: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    cpf: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    aprovado: {
      type: DataTypes.BOOLEAN
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  monitor.associate = function(models) {
    monitor.belongsTo(models.disciplina, {foreignKey: 'sigla_disciplina'});
    monitor.belongsTo(models.usuario, {foreignKey: 'cpf'});
  };
  return monitor;
};