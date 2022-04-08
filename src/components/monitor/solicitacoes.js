const SolicitacoesMonitoria = ({ solicitacoes, aceitar, recusar }) => {

  const buttonAceitar = (event) => {
    aceitar({ sigla: event.target.dataset.sigla, matricula: event.target.dataset.matricula });
  }

  const buttonRecusar = (event) => {
    recusar({ sigla: event.target.dataset.sigla, matricula: event.target.dataset.matricula });
  }

  return (
    <div className="w-full items-center">
      {
        solicitacoes?.length > 0
          ?
          solicitacoes?.map((item) => {
            return (
              <div className='w-1/3 widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                <div className="flex items-center">
                  <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
                  <div className="pl-4">
                    <p className="text-lg font-bold">
                      O aluno <a href={`/perfil/${item.matricula}`}><b>{item.nome}</b></a> solicita ser monitor de <b>{`${item.sigla} - ${item.disciplina}`}</b>.
                    </p>
                  </div>
                </div>
                <div class="flex mt-3">
                  <div class="w-1/4"></div>
                  <div class="w-1/4 mx-2">
                    <button
                      data-sigla={item.sigla}
                      data-matricula={item.matricula}
                      className="w-full btn btn-default bg-green-500 hover:bg-green-600 text-white btn-rounded btn-icon"
                      onClick={buttonAceitar}>
                      Aceitar
                    </button>
                  </div>
                  <div class="w-1/4 mx-2">
                    <button
                      data-sigla={item.sigla}
                      data-matricula={item.matricula}
                      className="w-full btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon"
                      onClick={buttonRecusar}>
                      Recusar
                    </button>
                  </div>
                  <div class="w-1/4"></div>
                </div>
              </div>
            )
          })
          :
          <div className="w-full mb-4">
            Sem solicitações de monitoria no momento
          </div>
      }
    </div>
  )
};

export default SolicitacoesMonitoria;
