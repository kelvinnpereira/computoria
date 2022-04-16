'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('certificado', {
      type: 'foreign key',
      fields: ['monitor'],
      name: 'monitor_cpf',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('certificado', {
      type: 'foreign key',
      fields: ['sigla_disciplina'],
      name: 'sigla_disciplina_certificado',
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
      'certificado', 
      'monitor_cpf',
      'sigla_disciplina_certificado',
    );
  }
};
