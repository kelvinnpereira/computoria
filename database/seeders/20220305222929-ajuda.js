'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ajuda', [
      {
        tutor: '55381028075',
        aluno: '13466113008',
        sigla_disciplina: 'ICC002',
        status: 'concluido',
        data_inicio: new Date(new Date() + "+0"),
        data_fim: new Date(new Date() + "+0"),
        nota_aluno: 4,
        nota_tutor: 3,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '55381028075',
        aluno: '13466113008',
        sigla_disciplina: 'ICC002',
        status: 'concluido',
        data_inicio: new Date(new Date() + "+0"),
        data_fim: new Date(new Date() + "+0"),
        nota_aluno: 5,
        nota_tutor: 4,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '13466113008',
        aluno: '55381028075',
        sigla_disciplina: 'ICC210',
        status: 'concluido',
        data_inicio: new Date(new Date() + "+0"),
        data_fim: new Date(new Date() + "+0"),
        nota_aluno: 4,
        nota_tutor: 3,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '13466113008',
        aluno: '55381028075',
        sigla_disciplina: 'ICC210',
        status: 'concluido',
        data_inicio: new Date(new Date() + "+0"),
        data_fim: new Date(new Date() + "+0"),
        nota_aluno: 3,
        nota_tutor: 4,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ajuda', {}, {});
  }
};
