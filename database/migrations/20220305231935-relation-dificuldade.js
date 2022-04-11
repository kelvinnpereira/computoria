'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('dificuldade', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'dificuldade_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('dificuldade', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'dificuldade_cpf_fk',
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
      'dificuldade',
      'dificuldade_sigla_disciplina_fk',
      'dificuldade_cpf_fk'
    );
  }
};
