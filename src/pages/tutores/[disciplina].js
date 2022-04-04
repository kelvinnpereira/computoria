import Head from "next/head";
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import ListarTutores from '../../components/tutor/listar';
import { get } from '../../lib/api';

const Tutores = ({ tutores }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Tutores
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Tutores" />
      <Widget>
        <ListarTutores tutores={tutores} />
      </Widget>
    </>
  );

};

export default Tutores;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/tutores/${context.params.disciplina}`, {
    headers: req.headers
  });
  return {
    props: { tutores: response.data.tutores },
  }
}