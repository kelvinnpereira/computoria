'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('curso', [
      {
        id: 1,
        sigla: 'IE08',
        nome: 'Ciência da Computação',
        descricao: 'Ciência da Computação',
        id_area: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        id: 2,
        sigla: 'FT05',
        nome: 'Engenharia da Computação',
        descricao: 'Engenharia da Computação',
        id_area: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        id: 3,
        sigla: 'IE17',
        nome: 'Engenharia de Software',
        descricao: 'Engenharia de Software',
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
