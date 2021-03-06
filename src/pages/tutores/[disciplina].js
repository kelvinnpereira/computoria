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
  const response1 = await get(`/api/tutores/${context.params.disciplina}`, {
    headers: req.headers
  });
  const response2 = await get(`/api/monitores/${context.params.disciplina}`, {
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
      tutores: response1.data.tutores.concat(response2.data.monitores.map((data) => {
        return {
          ...data, 
          usuario: `${data.usuario} (Monitor)`,
        }
      }))
    },
  }
}