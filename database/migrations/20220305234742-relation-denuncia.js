'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('denuncia', {
      type: 'foreign key',
      fields: ['denunciado'],
      name: 'denunciado_cpf',
      references: {
        table: 'usuario',
        field: 'cpf'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('denuncia', {
      type: 'foreign key',
      fields: ['denunciador'],
      name: 'denunciador_cpf',
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
      'denuncia', 
      'denunciado_cpf',
      'denunciador_cpf',
    );
  }
};
