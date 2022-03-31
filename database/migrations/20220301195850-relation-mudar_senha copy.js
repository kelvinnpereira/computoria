'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('mudar_senha_admin', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'mudar_senha_admin_cpf_fk',
      references: {
        table: 'admin',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'mudar_senha_admin',
      'mudar_senha_admin_cpf_fk'
    );
  }
};
