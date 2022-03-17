import React from 'react'
import Datatable from '../components/datatable'
import Avatars from '../components/d-board/dashboard/avatars'
import Flag from '@src/components/d-board/flag/index'
import {formatNumber} from '@src/functions/numbers'
import {ProgressBar} from '@src/components/progress-bars/index'
import { get } from '../lib/api';

const listTutors = ({disciplinas}) => {
  const columns = disciplinas.map(
    (item) => [
      {
        Header: 'Tutores',
        accessor: 'tutores',
        Cell: props => {
          return (
            item.nome
          )
        }
      },
      {
        Header: 'Curso',
        accessor: 'curso',
        Cell: props => {
          return (
            <>
            </>
          )
        }
      },
      {
        Header: 'Média',
        accessor: 'media',
        Cell: props => {
          return (
            <>
            </>
          )
        }
      },
    ],
    []
  )
  const item = disciplinas
  return <Datatable columns={columns} data={item} actions={() => {} } />

}

export default listTutors

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/proficiencia/listar', {
    params : {
      user: req.session.user
    }
  });
  console.log(response.data.disciplinas)
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}