'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('monitor', [
      {
        "sigla_disciplina": "ICC002",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        "sigla_disciplina": "ICC003",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('monitor', {}, {});
  }
};
