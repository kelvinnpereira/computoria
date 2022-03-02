'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargo = sequelize.define('cargo', {
    id : {
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
  cargo.associate = function(models) {
  };
  return cargo;
};