import React from 'react';
import Datatable from '../components/datatable';
import { get } from '../lib/api';
import Head from "next/head";
import SectionTitle from "../components/section/section-title";
import Widget from "../components/widget";

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
      nome: <a href='#'>{item.usuario}</a>,
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
      <SectionTitle title="Tutores" subtitle="Listar" actions={() => { }} />
      <Widget>
        <Datatable columns={columns} data={items} actions={() => { }} />
      </Widget>
    </>
  );

};
export default ListarTutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/listar_tutores', { headers: { cookie: req.headers.cookie } });
  return {
    props: { tutores: response.data.tutores },
  }
}