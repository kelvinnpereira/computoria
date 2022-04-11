import Head from "next/head";
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import ListarTutores from '../../components/tutor/listar_por_disciplina';
import { get } from '../../lib/api';

const Tutores = ({ tutores }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Ranking
        </title>
      </Head>
      <SectionTitle subtitle="Ranking" />
      <Widget>
        <ListarTutores tutores={tutores} />
      </Widget>
    </>
  );

};

export default Tutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/tutores_disciplina`, {
    headers: req.headers
  });
  return {
    props: { tutores: response.data.tutores },
  }
}