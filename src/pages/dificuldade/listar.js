import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';

const ListarDificuldade = ({ disciplinas }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Dificuldade
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Dificuldade" />
      <Widget>
        {disciplinas.length > 0
          ?
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
          :
          <p>Voce não tem disciplinas nessa lista</p>
        }
      </Widget>
    </>
  );
};

export default ListarDificuldade;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get('/api/dificuldade/listar', { headers: req.headers });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}