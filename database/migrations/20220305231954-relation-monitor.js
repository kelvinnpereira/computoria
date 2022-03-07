'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('monitor', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'monitor_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('monitor', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'monitor_cpf_fk',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'monitor',
      'monitor_sigla_disciplina_fk',
      'monitor_cpf_fk'
    );
  }
};
