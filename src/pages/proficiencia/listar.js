import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get, cookieToDict } from '../../lib/api';

const ListarProficiencia = ({ disciplinas }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Proficiencia
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Proficiencia" />
      <Widget>
        <List1 items={disciplinas?.map((item) => {
          return {
            title: item.sigla + " - " + item.nome
          }
        })} />
      </Widget>
    </>
  );
};

export default ListarProficiencia;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookie = cookieToDict(req.headers.cookie);
  const response = await get(`/api/proficiencia/listar/${cookie.user}`, { 
    headers: req.headers
  });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}