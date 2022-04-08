'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ajuda', [
      {
        tutor: '55381028075',
        aluno: '13466113008',
        sigla_disciplina: 'ICC002',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+5, '16', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+5, '17', '30'),
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
        sigla_disciplina: 'ICC003',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+6, '14', '30'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+6, '15', '30'),
        nota_aluno: 4,
        nota_tutor: 3,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '55381028075',
        aluno: '17515210010',
        sigla_disciplina: 'ICC006',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+7, '17', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+7, '19', '30'),
        nota_aluno: 4,
        nota_tutor: 3,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '55381028075',
        aluno: '17515210010',
        sigla_disciplina: 'ICC007',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+8, '14', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+8, '15', '0'),
        nota_aluno: 4,
        nota_tutor: 3,
        comentario_aluno: '',
        comentario_tutor: '',
        created_at: new Date(new Date() + "+0"),
        updated_at: new Date(new Date() + "+0")
      },
      {
        tutor: '55381028075',
        aluno: '81538709040',
        sigla_disciplina: 'ICC011',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '16', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '18', '00'),
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
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '16', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '18', '00'),
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
        sigla_disciplina: 'ICC309',
        status: 'solicitada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '16', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+9, '18', '00'),
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
        status: 'agendada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+1, '14', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+1, '15', '30'),
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
        status: 'agendada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+2, '14', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+2, '16', '30'),
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
        status: 'agendada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+3, '14', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+3, '17', '15'),
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
        status: 'agendada',
        data_inicio: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+4, '14', '0'),
        data_fim: new Date('2022', (new Date()).getMonth(), (new Date()).getDate()+4, '15', '45'),
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
