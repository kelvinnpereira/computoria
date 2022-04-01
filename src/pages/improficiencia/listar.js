import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';

const ListarImproficiencia = ({ disciplinas }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Improficiencia
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Improficiencia" />
      <Widget>
        <List1 items={disciplinas?.map((item) => {
          return {
            title:
              <a
                className='underline decoration-sky'
                href={`/tutores_disciplina/${item.sigla}`}>
                {item.sigla + " - " + item.nome}
              </a>
          }
        })} />
      </Widget>
    </>
  );
};

export default ListarImproficiencia;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/improficiencia/listar', { headers: req.headers });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}