'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ajuda', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tutor: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      aluno: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sigla_disciplina: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data_inicio: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_fim: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      nota_aluno: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      nota_tutor: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      comentario_aluno: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      comentario_tutor: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ajuda');
  }
};