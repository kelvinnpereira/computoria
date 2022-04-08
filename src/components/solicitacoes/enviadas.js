import Router from "next/router";

const SolicitacoesEnviadas = ({ usuario, agenda, cancelar }) => {
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

  const buttonReagendar = (event) => {
    Router.push('/ajuda/aluno_reagendar/' + event.target.id);
  }

  const buttonCancelar = (event) => {
    cancelar({ id: event.target.id });
  }

  return (
    <div className="w-full items-center">
      {agenda?.map((item) => {
        if (item.status === 'solicitada' && item.matricula_aluno === usuario.matricula) {
          const month = new Date(item.data_inicio).getMonth();
          const day = new Date(item.data_inicio).getDay();
          const date = new Date(item.data_inicio).getDate();
          const start = new Date(item.data_inicio).toLocaleTimeString().slice(0, -3);
          const end = new Date(item.data_fim).toLocaleTimeString().slice(0, -3);
          return (
            <div className='w-1/3 widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
              <div className="flex items-center">
                <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
                <div className="pl-4">
                  <p className="text-lg font-bold">
                    Você mandou uma solicitação de agendamento de ajuda para <a href={`/perfil/${item.matricula_tutor}`}><b>{item.nome_tutor}</b></a> na disciplina <b>{`${item.sigla_disciplina} - ${item.disciplina}.`}</b>
                  </p>
                  <p className="text-base font-light text-white">{`${semanas[day]}, ${date} de ${meses[month]} | ${start} até ${end}`} </p>
                </div>
              </div>
              <div class="flex mt-3">
                <div class="w-1/4"></div>
                <div class="w-1/4 mx-2">
                  <button
                    id={item.id}
                    className="w-full btn btn-default bg-green-500 hover:bg-green-600 text-white btn-rounded btn-icon"
                    onClick={buttonReagendar}>
                    Reagendar
                  </button>
                </div>
                <div class="w-1/4 mx-2">
                  <button
                    id={item.id}
                    className="w-full btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon"
                    onClick={buttonCancelar}>
                    Cancelar
                  </button>
                </div>
                <div class="w-1/4"></div>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default SolicitacoesEnviadas