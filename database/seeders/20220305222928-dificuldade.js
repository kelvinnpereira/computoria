'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('dificuldade', [
      {
        sigla_disciplina: "ICC210",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('dificuldade', {}, {});
  }
};
