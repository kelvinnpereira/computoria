'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('disponibilidade', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dia: {
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