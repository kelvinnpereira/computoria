'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
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
  area.associate = function (models) {
    area.hasMany(models.curso, { foreignKey: 'id_area' });
  };
  return area;
};