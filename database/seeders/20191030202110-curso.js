'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('curso', [
      {
        sigla: 'IE08',
        nome: 'Ciência da Computação',
        id_area: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        sigla: 'FT05',
        nome: 'Engenharia da Computação',
        id_area: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        sigla: 'IE17',
        nome: 'Engenharia de Software',
        id_area: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('curso', {}, {});
  }
};
