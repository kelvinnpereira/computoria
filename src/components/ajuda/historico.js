import Router from "next/router";

const Historico = ({ usuario, agenda, width = 'w-1/3' }) => {
  const semanas = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  return (
    <div className="w-full items-center">
      {agenda?.map((item) => {
        if (item.status === 'concluida') {
          const month = new Date(item.data_inicio).getMonth();
          const day = new Date(item.data_inicio).getDay();
          const date = new Date(item.data_inicio).getDate();
          const start = new Date(item.data_inicio).toLocaleTimeString().slice(0, -3);
          const end = new Date(item.data_fim).toLocaleTimeString().slice(0, -3);
          let descricao;
          let link_denunciar;
          let disabled;
          let btn_avaliar;
          let btn_denunciar;
          if (item.matricula_aluno === usuario.matricula) {
            descricao =
              <p className="text-lg font-bold">
                Aula de <b>{`${item.sigla_disciplina} - ${item.disciplina}`}</b> com o tutor/monitor <a href={`/perfil/${item.matricula_tutor}`}><b>{item.nome_tutor}</b></a>.
              </p>;
            link_denunciar = '/denunciar/' + item.matricula_tutor;
            disabled = item.nota_aluno !== null;
            btn_avaliar = 'Avaliar Tutor';
            btn_denunciar = 'Denunciar Tutor';
          } else if (item.matricula_tutor === usuario.matricula) {
            descricao =
              <p className="text-lg font-bold">
                Você deu uma aula de <b>{`${item.sigla_disciplina} - ${item.disciplina}`}</b> para o aluno <a href={`/perfil/${item.matricula_aluno}`}><b>{item.nome_aluno}</b></a>.
              </p>;
            link_denunciar = '/denunciar/' + item.matricula_aluno;
            disabled = item.nota_tutor !== null;
            btn_avaliar = 'Avaliar Aluno';
            btn_denunciar = 'Denunciar Aluno';
          }
          return (
            <div className={`${width} widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800`}>
              <div className="flex items-center">
                <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
                <div className="pl-4">
                  {descricao}
                  <p className="text-base font-light text-white">{`${semanas[day]}, ${date} de ${meses[month]} | ${start} até ${end}`} </p>
                </div>
              </div>
              <div class="flex mt-3">
                <div class="w-1/2 mx-2">
                  <button
                    disabled={disabled}
                    id={item.id}
                    className="w-full btn btn-default bg-green-500 hover:bg-green-600 text-white btn-rounded btn-icon"
                    onClick={(e) => Router.push('/ajuda/avaliar/' + item.id)}>
                    {btn_avaliar}
                  </button>
                </div>
                <div class="w-1/2 mx-2">
                  <button
                    id={item.id}
                    className="w-full btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon"
                    onClick={(e) => Router.push(link_denunciar)}>
                    {btn_denunciar}
                  </button>
                </div>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Historico;
