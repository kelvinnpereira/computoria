'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('usuario', {
      type: 'foreign key',
      fields: ['sigla_curso'],
      name: 'usuario_cpf_sigla_fk',
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
      'usuario',
      'usuario_cpf_sigla_fk'
    );
  }
};
