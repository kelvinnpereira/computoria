import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";

const Home = ({ pendencias }) => {
  const onAction = () => {
    
  }

  const onError = (err) => {
    
  };

  const [isLoadingAceitar, setRequestAceitar] = useRequest(onAction, onError, '/api/monitoria/aceitar');
  const [isLoadingRemover, setRequestRemover] = useRequest(onAction, onError, '/api/monitoria/remover');
  
  return (
    <>
      <Head>
        <title>
          Computoria: Home Coordenador
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home Coordenador" />
      <Widget>
      </Widget>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/monitoria/solicitacoes`, {
    headers: req.headers,
  });
  return {
    props: {
      pendencias: response1.data.pendencias
    }
  }
}
