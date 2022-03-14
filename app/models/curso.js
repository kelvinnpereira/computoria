'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: {
      type: DataTypes.STRING,
      primaryKey: true,
    }, 
    nome: {
      type: DataTypes.STRING,
    },
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area, {foreignKey: 'id_area'});
    curso.hasMany(models.usuario, {foreignKey: 'sigla_curso'});
    curso.hasMany(models.disciplina_curso, {foreignKey: 'sigla_curso'});
  };
  return curso;
};