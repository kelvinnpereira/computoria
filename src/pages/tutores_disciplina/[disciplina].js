import Head from "next/head";
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import ListarTutores from '../../components/tutor/listar_por_disciplina';
import { get } from '../../lib/api';

const Tutores = ({ tutores, disciplina }) => {

  return (
    <>
      <Head>
        <title>
          Computoria: Ranking da disciplina {disciplina.nome}
        </title>
      </Head>
      <SectionTitle subtitle={`Ranking da disciplina ${disciplina.nome}`} />
      <Widget>
        <ListarTutores tutores={tutores} />
      </Widget>
    </>
  );

};

export default Tutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/tutores_disciplina/${context.params.disciplina}`, {
    headers: req.headers
  });
  const response2 = await get(`/api/monitores_disciplina/${context.params.disciplina}`, {
    headers: req.headers
  });
  const response3 = await get(`/api/disciplina/${context.params.disciplina}`);
  const response4 = await get('/api/usuario');
  if (!response1.data?.tutores || !response2.data?.monitores || !response3.data?.disciplina) {
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
  return {
    props: {
      tutores: response1.data.tutores.concat(response2.data.monitores),
      disciplina: response3.data.disciplina,
    },
  }
}