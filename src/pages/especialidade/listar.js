import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';

const ListarEspecialidade = ({ disciplinas }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Especialidade
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Especialidade" />
      <Widget>
        {disciplinas.length > 0
          ?
          <List1 items={disciplinas?.map((item) => {
            return {
              title: item.sigla + " - " + item.nome
            }
          })} />
          :
          <p>Voce não tem disciplinas nessa lista</p>
        }
      </Widget>
    </>
  );
};

export default ListarEspecialidade;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/especialidade/listar`, {
    headers: req.headers
  });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}