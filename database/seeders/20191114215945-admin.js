'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin', [
      {
        nome: 'Andre Carvalho',
        cpf: '55381028075',
        matricula: '87654321',
        email: 'kelvinn.nunes.p@gmail.com',
        senha: '$2a$10$HiRfQaPoDkzOmGFo1AuDjeNO0Kdsx0yhP7x3y6kvPeql.R78Zhd6q',
        sigla_curso: 'IE17',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0"),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', {}, {});
  }
};
