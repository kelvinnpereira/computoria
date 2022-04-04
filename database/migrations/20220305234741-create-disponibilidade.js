'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('disponibilidade', {
      cpf: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      dia: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hora_indice: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hora_inicio: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hora_fim: {
        allowNull: false,
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
    return queryInterface.dropTable('disponibilidade');
  }
};