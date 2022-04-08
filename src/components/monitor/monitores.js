const Monitores = ({ monitores, remover }) => {

  const buttonRemover = (event) => {
    remover({ sigla: event.target.dataset.sigla, matricula: event.target.dataset.matricula });
  }

  return (
    <div className="w-full items-center">
      {
        monitores?.length > 0
          ?
          monitores?.map((item) => {
            return (
              <div className='w-1/3 widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                <div className="flex items-center">
                  <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
                  <div className="pl-4">
                    <p className="text-lg font-bold">
                      <b>{`${item.sigla} - ${item.disciplina}`}</b>: <a href={`/perfil/${item.matricula}`}><b>{item.nome}</b></a>.
                    </p>
                  </div>
                </div>
                <div class="flex mt-3">
                  <div class="w-1/3"></div>
                  <div class="w-1/3">
                    <button
                      data-sigla={item.sigla}
                      data-matricula={item.matricula}
                      className="w-full btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon"
                      onClick={buttonRemover}>
                      Remover
                    </button>
                  </div>
                  <div class="w-1/3"></div>
                </div>
              </div>
            )
          })
          :
          <div className="w-full mb-4">
            Sem monitores
          </div>
      }
    </div>
  )
};

export default Monitores;
