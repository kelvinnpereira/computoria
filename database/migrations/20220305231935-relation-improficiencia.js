'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('improficiencia', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'improficiencia_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('improficiencia', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'improficiencia_cpf_fk',
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
      'improficiencia',
      'improficiencia_sigla_disciplina_fk',
      'improficiencia_cpf_fk'
    );
  }
};
