'use strict';
module.exports = (sequelize, DataTypes) => {
  const proficiencia = sequelize.define('proficiencia', {
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
  proficiencia.associate = function (models) {
    proficiencia.belongsTo(models.disciplina, { foreignKey: 'sigla_disciplina' });
    proficiencia.belongsTo(models.usuario, { foreignKey: 'cpf' });
  };
  return proficiencia;
};