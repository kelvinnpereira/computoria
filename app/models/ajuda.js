'use strict';
module.exports = (sequelize, DataTypes) => {
  const ajuda = sequelize.define('ajuda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tutor: {
      type: DataTypes.STRING,
    },
    aluno: {
      type: DataTypes.STRING,
    },
    sigla_disciplina: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING, //solicitado, agendado, concluido
    },
    data_inicio: {
      type: DataTypes.DATE,
    },
    data_fim: {
      type: DataTypes.DATE,
    },
    nota_aluno: {
      type: DataTypes.INTEGER,
    },
    nota_tutor: {
      type: DataTypes.INTEGER,
    },
    comentario_aluno: {
      type: DataTypes.STRING,
    },
    comentario_tutor: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    freezeTableName: true,
  });
  ajuda.associate = function (models) {
    ajuda.belongsTo(models.usuario, { foreignKey: 'tutor' });
    ajuda.belongsTo(models.usuario, { foreignKey: 'aluno' });
    ajuda.belongsTo(models.disciplina, { foreignKey: 'sigla_disciplina' });
  };
  return ajuda;
};