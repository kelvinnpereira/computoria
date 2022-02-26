'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    nome: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
  });
  area.associate = function(models) {
    area.hasMany(models.curso, {foreignKey: 'id_area'});
  };
  return area;
};