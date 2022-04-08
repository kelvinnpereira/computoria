import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";
import { UnderlinedTabs } from "../../../components/tabs";
import Modal from "../../../components/modals";
import List1 from "../../../components/d-board/lists/list-1";
import AceitarMonitor from "../../../components/monitor/aceitar";
import RemoverMonitor from "../../../components/monitor/remover";
import Router from "next/router";

const Solicitacoes = ({ monitores }) => {
  return (
    <>
      {
        monitores?.length == 0
          ?
          <div className="w-full mb-4">
            Sem monitores aprovados no momento
          </div>
          :
          <List1 items={monitores?.map((item) => {
            return ({
              title: item.sigla + " - " + item.nome
            })
          })} />
      }
    </>
  )
}

const Home = ({ pendencias, monitores }) => {

  
  const onAction = () => {
  }

  const onError = (err) => {
    
  };

  const [isLoadingAceitar, setRequestAceitar] = useRequest(onAction, onError, '/api/monitoria/aceitar');
  const [isLoadingRemover, setRequestRemover] = useRequest(onAction, onError, '/api/monitoria/remover');

  const tabs = [
    { title: 'Monitores', index: 0, content: <Solicitacoes monitores={monitores} /> },
    { title: 'Aceitar', index: 1, content: <AceitarMonitor pendencias={pendencias} setAction={setRequestAceitar} isLoading={isLoadingAceitar} /> },
    { title: 'Remover', index: 2, content: <RemoverMonitor pendencias={monitores} setAction={setRequestRemover} isLoading={isLoadingRemover} /> }
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
  const response2 = await get(`/api/monitoria/listar/aprovados`, {
    headers: req.headers,
  });
  return {
    props: {
      pendencias: response1.data.pendencias,
      monitores: response2.data.monitores,
    }
  }
}
