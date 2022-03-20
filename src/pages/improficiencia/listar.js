import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';

const Index = ({ disciplinas }) => {
  const actions = (
    <>
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon"
      >
        Refresh
      </button>
    </>
  );

  return (
    <>
      <Head>
        <title>
          Computoria: Listar Improficiencia
        </title>
      </Head>
      <SectionTitle title="Improficiencia" subtitle="Listar" actions={actions} />
      <Widget>
        <List1 items={disciplinas?.map((item)=> {
          return {
            title: item.sigla + " - " + item.nome
          }
        })}/>
      </Widget>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/improficiencia/listar', { headers: { cookie: req.headers.cookie } });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}