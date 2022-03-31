'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proficiencia', [
      {
        "sigla_disciplina": "ICC002",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC003",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC006",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC007",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC011",
        cpf: "55381028075",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC210",
        cpf: "13466113008",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC309",
        cpf: "13466113008",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC313",
        cpf: "13466113008",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        sigla_disciplina: "ICC404",
        cpf: "13466113008",
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proficiencia', {}, {});
  }
};
