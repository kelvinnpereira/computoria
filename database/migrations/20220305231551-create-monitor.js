'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('monitor', {
      sigla_disciplina: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      cpf: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      aprovado: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('monitor');
  }
};