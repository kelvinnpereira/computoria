'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('disciplina', {
      type: 'foreign key',
      fields: ['id_categoria'],
      name: 'disciplina_id_categoria_fk',
      references: {
        table: 'categoria',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'disciplina',
      'disciplina_id_categoria_fk'
    );
  }
};
