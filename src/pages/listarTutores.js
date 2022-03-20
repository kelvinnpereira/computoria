import React from 'react';
import Datatable from '../components/datatable';
import { get } from '../lib/api';
import List1 from '../components/d-board/lists/list-1';
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


  const items = tutores?.map( (item) => {
    return {
      nome: item.usuario, 
      curso: item.curso, 
      media: '4.0'
    }
  });

  return (
    <Datatable columns={columns} data={items} actions={ () => {}}/>
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