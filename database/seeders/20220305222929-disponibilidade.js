'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('disponibilidade', [
      {
        cpf: '55381028075',
        dia: 1,
        hora_indice: 0,
        hora_inicio: '15:00',
        hora_fim: '20:00',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        cpf: '55381028075',
        dia: 2,
        hora_indice: 0,
        hora_inicio: '15:00',
        hora_fim: '20:00',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        cpf: '55381028075',
        dia: 3,
        hora_indice: 0,
        hora_inicio: '15:00',
        hora_fim: '20:00',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        cpf: '55381028075',
        dia: 4,
        hora_indice: 0,
        hora_inicio: '15:00',
        hora_fim: '20:00',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        cpf: '55381028075',
        dia: 5,
        hora_indice: 0,
        hora_inicio: '15:00',
        hora_fim: '20:00',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disponibilidade', {}, {});
  }
};
