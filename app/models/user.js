'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'O nome precisa ter entre 6 e 100 caracteres.'
        }
      }
    },
    email: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 100],
          msg: 'A senha precisa ter mais que 6 caracteres.'
        }
      }
    },
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  user.associate = function(models) {
    user.belongsTo(models.curso,    {foreignKey: 'id_curso' , as: 'id_curso_fk'});
    user.hasMany  (models.partida,  {foreignKey: 'winner'   , as: 'user_winner'});
    user.hasMany  (models.mensagem, {foreignKey: 'id_user'  , as: 'id_user_fk'});
  };
  return user;
};