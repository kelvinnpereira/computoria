'use strict';
module.exports = (sequelize, DataTypes) => {
  const disciplina_curso = sequelize.define('disciplina_curso', {
    sigla_disciplina: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    sigla_curso: {
      primaryKey: true,
      type: DataTypes.STRING
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  disciplina_curso.associate = function(models) {
    disciplina_curso.belongsTo(models.disciplina, {foreignKey: 'sigla_disciplina'});
    disciplina_curso.belongsTo(models.curso, {foreignKey: 'sigla_curso'});
  };
  return disciplina_curso;
};