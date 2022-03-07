'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('disciplina_curso', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'disciplina_curso_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('disciplina_curso', {
      type: 'foreign key',
      fields: ['sigla_curso'],
      name: 'disciplina_curso_sigla_curso_fk',
      references: {
        table: 'curso',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'disciplina_curso',
      'disciplina_curso_sigla_disciplina_fk',
      'disciplina_curso_sigla_curso_fk'
    );
  }
};
