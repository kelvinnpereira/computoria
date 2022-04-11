'use strict';
module.exports = (sequelize, DataTypes) => {
  const disciplina = sequelize.define('disciplina', {
    sigla: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    id_categoria: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  disciplina.associate = function (models) {
    disciplina.belongsTo(models.categoria, { foreignKey: 'id_categoria' });
    disciplina.hasMany(models.disciplina_curso, { foreignKey: 'sigla_disciplina' });
    disciplina.hasMany(models.especialidade, { foreignKey: 'sigla_disciplina' });
    disciplina.hasMany(models.dificuldade, { foreignKey: 'sigla_disciplina' });
    disciplina.hasMany(models.monitor, { foreignKey: 'sigla_disciplina' });
    disciplina.hasMany(models.ajuda, { foreignKey: 'sigla_disciplina' });
  };
  return disciplina;
};