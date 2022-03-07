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
  disciplina.associate = function(models) {
    disciplina.belongsTo(models.categoria, {foreignKey: 'id_categoria'});
    disciplina.belongsToMany(models.curso, {through: 'disciplina_curso'});
  };
  return disciplina;
};