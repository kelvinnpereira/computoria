'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [
      {
        nome: 'Joao Neto',
        cpf: '12345678911',
        matricula: '12345678',
        email: 'joao@mail.com',
        senha: '$2a$10$6abk7e6RUOjUGxAqsr30IuLheDqAw47zCVShOQe0KrPA9CNsKdGZi',
        sigla_curso: 'IE17',
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        nome: 'Pedro Souza',
        cpf: '12345678910',
        email: 'pedro@mail.com',
        matricula: '12345679',
        senha: '$2a$10$6abk7e6RUOjUGxAqsr30IuLheDqAw47zCVShOQe0KrPA9CNsKdGZi',
        sigla_curso: 'IE17',
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', {}, {});
  }
};
