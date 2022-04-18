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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'certificado', 
      'monitor_cpf',
    );
  }
};
