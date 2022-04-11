import React from 'react';
import Datatable from '../datatable';

function nomeFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <div className="form-element" key="container-0">
      <input
        type="text"
        className={`form-input`}
        placeholder={`Pesquise pelo nome dos tutores/monitores...`}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        value={filterValue || ''}
      />
    </div>
  )
}

function cursoFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <>
      <div className="form-element" key="container-3">
        <select
          value={filterValue}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
          className={`form-select`}>
          <option value="">Todos os cursos</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

const ListarTutores = ({ tutores }) => {
  const columns = [
    {
      Header: 'Tutores',
      accessor: 'nome',
      Filter: nomeFilter,
      filter: (rows, id, filterValue) => {
        return rows.filter((row) => row.values[id].props.children.toLowerCase().includes(filterValue));
      }
    },
    {
      Header: 'Curso',
      accessor: 'curso',
      Filter: cursoFilter,
      filter: 'includes',
    },
    {
      Header: 'Média',
      accessor: 'media',
      Filter: <></>,
      filter: 'includes',
    },
  ];

  const items = tutores?.map((item) => {
    return {
      nome:
        <a
          className='underline decoration-sky'
          href={`/perfil/${item.matricula}`}>
          {item.usuario}
        </a>,
      curso: item.curso,
      media: Number(item.media).toFixed(2),
    }
  });

  return (
    <Datatable columns={columns} data={items} />
  );

};

export default ListarTutores;
