'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('mudar_senha', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'mudar_senha_cpf_fk',
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
      'mudar_senha',
      'mudar_senha_cpf_fk'
    );
  }
};
