'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoria = sequelize.define('categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }, 
    nome: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  categoria.associate = function(models) {
    categoria.hasMany(models.disciplina, {foreignKey: 'id_categoria'});
  };
  return categoria;
};