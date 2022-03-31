'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('admin', {
      type: 'foreign key',
      fields: ['sigla_curso'],
      name: 'admin_cpf_sigla_fk',
      references: {
        table: 'curso',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'admin',
      'admin_cpf_sigla_fk'
    );
  }
};
