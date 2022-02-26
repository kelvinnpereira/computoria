'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargo = sequelize.define('cargo', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'O nome precisa ter entre 6 e 100 caracteres.'
        }
      }
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  cargo.associate = function(models) {
  };
  return cargo;
};