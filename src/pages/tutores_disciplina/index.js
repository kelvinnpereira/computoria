import Head from "next/head";
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import ListarTutores from '../../components/tutor/listar_por_disciplina';
import { get } from '../../lib/api';

const Tutores = ({ tutores }) => {
  const map = new Map();
  tutores = tutores.filter((item) => {
    if (!map.has(item.disciplina)) {
      map.set(item.disciplina, true);
      return true;
    } else {
      return false;
    }
  });
  return (
    <>
      <Head>
        <title>
          Computoria: Ranking Geral
        </title>
      </Head>
      <SectionTitle subtitle="Ranking Geral" />
      <Widget>
        <ListarTutores tutores={tutores} />
      </Widget>
    </>
  );

};

export default Tutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/tutores_disciplina`, {
    headers: req.headers
  });
  const response2 = await get(`/api/monitores_disciplina`, {
    headers: req.headers
  });
  if (!response1.data?.tutores || !response2.data?.monitores) {
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
  return {
    props: {
      tutores: response1.data.tutores.concat(response2.data.monitores)
    },
  }
}