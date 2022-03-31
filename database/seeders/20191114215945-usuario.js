'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [
      {
        nome: 'Kelvinn Pereira',
        cpf: '55381028075',
        matricula: '87654321',
        email: 'kelvinn.nunes.p@gmail.com',
        senha: '$2a$10$HiRfQaPoDkzOmGFo1AuDjeNO0Kdsx0yhP7x3y6kvPeql.R78Zhd6q',
        sigla_curso: 'IE08',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0"),
      },
      {
        nome: 'Hiago Leda',
        cpf: '13466113008',
        matricula: '87664321',
        email: 'hiago_h16@hotmail.com',
        senha: '$2a$10$HiRfQaPoDkzOmGFo1AuDjeNO0Kdsx0yhP7x3y6kvPeql.R78Zhd6q',
        sigla_curso: 'IE17',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0"),
      },
      {
        nome: 'Nahan Trindade',
        cpf: '17515210010',
        matricula: '87654221',
        email: 'nahantrindade.p@gmail.com',
        senha: '$2a$10$HiRfQaPoDkzOmGFo1AuDjeNO0Kdsx0yhP7x3y6kvPeql.R78Zhd6q',
        sigla_curso: 'IE08',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0"),
      },
      {
        nome: 'Alexander Nascimento',
        cpf: '81538709040',
        matricula: '87614221',
        email: 'alexander.nascimentoc@gmail.com',
        senha: '$2a$10$HiRfQaPoDkzOmGFo1AuDjeNO0Kdsx0yhP7x3y6kvPeql.R78Zhd6q',
        sigla_curso: 'IE17',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0"),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', {}, {});
  }
};
