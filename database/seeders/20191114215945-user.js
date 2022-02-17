'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        id: 1,
        nome: 'Joao Neto',
        email: 'joao@mail.com',
        senha: '$2a$10$6abk7e6RUOjUGxAqsr30IuLheDqAw47zCVShOQe0KrPA9CNsKdGZi',
        id_curso: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        id: 2,
        nome: 'Pedro Souza',
        email: 'pedro@mail.com',
        senha: '$2a$10$6abk7e6RUOjUGxAqsr30IuLheDqAw47zCVShOQe0KrPA9CNsKdGZi',
        id_curso: 1,
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', {}, {});
  }
};
