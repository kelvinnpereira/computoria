'use strict';
module.exports = (sequelize, DataTypes) => {
  const mudar_senha = sequelize.define('mudar_senha', {
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
  mudar_senha.associate = function (models) {
    mudar_senha.belongsTo(models.usuario, { foreignKey: 'cpf' });
  };
  return mudar_senha;
};
