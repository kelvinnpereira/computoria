import Router from "next/router";
import Head from "next/head";
import { useState } from "react";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { UnderlinedTabs } from "../../../components/tabs";
import SolicitacoesMonitoria from "../../../components/monitor/solicitacoes";
import Monitores from "../../../components/monitor/monitores";
import Modal from '../../../components/modals';

import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";

const sucessBody = () => {
  return (
    <div class="relative p-4 w-full text-center">
      <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <div class="flex flex-col w-full mb-4">
        <div class="text-lg mb-2 font-bold">Ação executada com sucesso</div>
      </div>
    </div>
  )
}

const buttonModal = () => {
  return (
    <button
      onClick={(e) => Router.push('/home')}
      className="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
      type="button">
      Home
    </button>
  );
}

const Home = ({ solicitacoes, monitores }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  const onAction = (data) => {
    setModal(true);
    // window.setInterval(() => {
    //   window.location.reload();
    // }, 3000);
  }

  const onError = (err) => {
    console.error(err);
    setErrorMessage("");
    if (typeof err !== "undefined" && err.error) {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo de errado aconteceu :(");
    }
  };

  const [isLoadingAceitar, setRequestAceitar] = useRequest(onAction, onError, '/api/monitoria/aceitar');
  const [isLoadingRemover, setRequestRemover] = useRequest(onAction, onError, '/api/monitoria/remover');

  const tabs = [
    {
      title: 'Monitores',
      index: 0,
      content: <Monitores
        monitores={monitores}
        remover={setRequestRemover} />
    },
    {
      title: 'Solicitações de Monitoria',
      index: 1,
      content: <SolicitacoesMonitoria
        solicitacoes={solicitacoes}
        aceitar={setRequestAceitar}
        recusar={setRequestRemover} />
    },
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
        <Modal
          title={'Coordenador'}
          body={sucessBody()}
          open={showModal}
          setOpen={setModal}
          btns={buttonModal()} />
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
      solicitacoes: response1.data.solicitacoes,
      monitores: response2.data.monitores,
    }
  }
}
