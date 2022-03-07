'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [
      {
        nome: 'Kelvinn Pereira',
        cpf: '55381028075',
        matricula: '87654321',
        email: 'kelvinn.nunes.p@gmail.com',
        senha: '$2a$10$JLDHsB3z1eFH.sRwJLGMEuqUwwHeTpAXDvRgNkCE3yDHxvWolrriK',
        sigla_curso: 'IE17',
        created_at: new Date(new Date()+"+0"),
        updated_at: new Date(new Date()+"+0"),
      },
      {
        nome: 'Pedro Souza',
        cpf: '28635138007',
        email: 'pedro@mail.com',
        matricula: '87654329',
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
