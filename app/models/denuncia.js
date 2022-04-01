'use strict';
module.exports = (sequelize, DataTypes) => {
  const denuncia = sequelize.define('denuncia', {
    denunciado: {
      type: DataTypes.STRING,
    },
    denunciador: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    comentario: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  denuncia.associate = function (models) {
    denuncia.belongsTo(models.usuario, { foreignKey: 'denunciado' });
    denuncia.belongsTo(models.usuario, { foreignKey: 'denunciador' });
  };
  return denuncia;
};