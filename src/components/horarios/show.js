const Horarios = ({ horarios }) => {

  let horarios_array = [[], [], [], [], [], [], []];
  horarios.forEach((item) => {
    horarios_array[item.dia].push(item);
  })

  return (
    <table className="table border-separate border-slate-500">
      <thead>
        <tr>
          <th className='border border-slate-600'>Domingo</th>
          <th className='border border-slate-600'>Segunda</th>
          <th className='border border-slate-600'>Terça</th>
          <th className='border border-slate-600'>Quarta</th>
          <th className='border border-slate-600'>Quinta</th>
          <th className='border border-slate-600'>Sexta</th>
          <th className='border border-slate-600'>Sábado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {
            horarios_array.map((horarios, i) => {
              return horarios.length === 0
                ?
                (
                  <td className='border border-slate-700'>
                    <div className='widget p-4 text-center rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                      <p>Sem horarios</p>
                    </div>
                  </td>
                )
                :
                <td className='border border-slate-700'>
                  {horarios.map((hora, j) => {
                    return (
                      <>
                        <div className='widget p-4 text-center rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
                          {`${hora.hora_inicio} as ${hora.hora_fim}`}
                        </div>
                      </>
                    )
                  })}
                </td>
            })
          }
        </tr>
      </tbody>
    </table>
  )
}

export default Horarios;