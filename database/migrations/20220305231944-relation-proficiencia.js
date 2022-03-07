'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('proficiencia', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'proficiencia_sigla_disciplina_fk',
      references: {
        table: 'disciplina',
        field: 'sigla'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('proficiencia', {
      type: 'foreign key',
      fields: ['cpf'],
      name: 'proficiencia_cpf_fk',
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
      'proficiencia',
      'proficiencia_sigla_disciplina_fk',
      'proficiencia_cpf_fk'
    );
  }
};
