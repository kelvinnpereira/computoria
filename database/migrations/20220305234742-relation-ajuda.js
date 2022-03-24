'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ajuda', {
      type: 'foreign key',
      fields: ['tutor'],
      name: 'tutor_cpf',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('ajuda', {
      type: 'foreign key',
      fields: ['aluno'],
      name: 'aluno_cpf',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })).then(() => queryInterface.addConstraint('ajuda', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'sigla_disciplina_ajuda',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'tutor_cpf',
      'aluno_cpf',
      'sigla_disciplina_ajuda',
    );
  }
};
