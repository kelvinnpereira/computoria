import React from 'react';
import Datatable from '../components/datatable';
import { get } from '../lib/api';
import Head from "next/head";
import SectionTitle from "../components/section/section-title";

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

  const items = tutores?.map( (item) => {
    return {
      nome: item.usuario, 
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
      <SectionTitle title="Tutores" subtitle="Listar" actions={ () => {}} />
      <Datatable columns={columns} data={items} actions={ () => {}}/>
    </>
  );

};
export default ListarTutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/listar_tutores', {
    params : {
      user: req.session.user
    }
  });
  return {
    props: { tutores: response.data.tutores },
  }
}