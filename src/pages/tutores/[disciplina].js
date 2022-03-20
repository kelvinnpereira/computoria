import React from 'react';
import Datatable from '../../components/datatable';
import { get } from '../../lib/api';
import Head from "next/head";
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";

const ListarTutores = ({ tutores }) => {
  const columns = [
    {
      Header: 'Tutores',
      accessor: 'nome',
    },
    {
      Header: 'Curso',
      accessor: 'curso',
    },
    {
      Header: 'Média',
      accessor: 'media',
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
      media: '',
    }
  });

  return (
    <>
      <Head>
        <title>
          Computoria: Listar Tutores
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Tutores" />
      <Widget>
        <Datatable columns={columns} data={items} />
      </Widget>
    </>
  );

};

export default ListarTutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/tutores/${context.params.disciplina}`, {
    headers: { cookie: req.headers.cookie },
  });
  return {
    props: { tutores: response.data.tutores },
  }
}