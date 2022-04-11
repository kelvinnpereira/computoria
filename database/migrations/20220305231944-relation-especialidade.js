'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('especialidade', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'especialidade_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('especialidade', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'especialidade_cpf_fk',
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
      'especialidade',
      'especialidade_sigla_disciplina_fk',
      'especialidade_cpf_fk'
    );
  }
};
