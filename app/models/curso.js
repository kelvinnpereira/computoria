'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: DataTypes.STRING,
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 40],
          msg: 'O nome precisa ter entre 5 e 40 caracteres.'
        }
      }
    },
    descricao: DataTypes.TEXT,
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area, {foreignKey: 'id_area'});
    curso.hasMany(models.user, {foreignKey: 'id_curso'});
  };
  return curso;
};