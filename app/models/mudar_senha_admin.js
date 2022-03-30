'use strict';
module.exports = (sequelize, DataTypes) => {
  const mudar_senha_admin = sequelize.define('mudar_senha_admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  }, {
      underscored: true,
      freezeTableName: true,
  });
  mudar_senha_admin.associate = function(models) {
    mudar_senha_admin.belongsTo(models.admin, {foreignKey: 'cpf'});
  };
  return mudar_senha_admin;
};
