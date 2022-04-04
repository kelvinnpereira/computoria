import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";
import { UnderlinedTabs } from "../../../components/tabs";
import List1 from "../../../components/d-board/lists/list-1";
import AceitarMonitor from "../../../components/monitor/aceitar";

const Solicitacoes = ({ pendencias }) => {
  return (
    <List1 items={pendencias?.map((item) => {
      return ({
        title: item.sigla + " - " + item.nome
      })
    })} />
  )
}


const RemoverMonitor = ({ }) => {
  return (
    <></>
  )
}

const Home = ({ pendencias }) => {

  const onAction = () => {

  }

  const onError = (err) => {

  };

  const [isLoadingAceitar, setRequestAceitar] = useRequest(onAction, onError, '/api/monitoria/aceitar');
  const [isLoadingRemover, setRequestRemover] = useRequest(onAction, onError, '/api/monitoria/remover');

  const tabs = [
    { title: 'Solicitações', index: 0, content: <Solicitacoes pendencias={pendencias} /> },
    { title: 'Aceitar', index: 1, content: <AceitarMonitor pendencias={pendencias} setAction={setRequestAceitar} isLoading={isLoadingAceitar}/> },
    { title: 'Remover', index: 2 }
  ]

  return (
    <>
      <Head>
        <title>
          Computoria: Home Coordenador
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home Coordenador" />
      <Widget>

        <UnderlinedTabs tabs={tabs} />
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
