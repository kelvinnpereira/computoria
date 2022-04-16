'use strict';
module.exports = (sequelize, DataTypes) => {
  const certificado = sequelize.define('certificado', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    monitor: {
      type: DataTypes.STRING,
    },
    sigla_disciplina: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  certificado.associate = function (models) {
    certificado.belongsTo(models.usuario, { foreignKey: 'monitor' });
    certificado.belongsTo(models.disciplina, { foreignKey: 'sigla_disciplina' });
  };
  return certificado;
};