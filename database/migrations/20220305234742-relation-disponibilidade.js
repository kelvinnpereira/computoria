'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('disponibilidade', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'disponibilidade_cpf',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'disponibilidade',
      'disponibilidade_cpf',
    );
  }
};
