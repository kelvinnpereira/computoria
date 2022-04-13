import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import Form from "../../../components/avaliacao/form";
import Modal from "../../../components/modals"

import { useState } from "react";
import Router from "next/router";

import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";

const Avaliar = ({ ajuda, usuario }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  const sucessBody = () => {
    return (
      <div class="relative p-4 w-full text-center">
        <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <div class="flex flex-col w-full mb-4">
          <div class="text-lg mb-2 font-bold">Avaliação realizada com sucesso</div>
        </div>
      </div>)
  }

  const buttonModal = () => {
    return (
      <button onClick={(e) => Router.push('/home/usuario')} class="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full" type="button">Home</button>
    );
  }

  const onAction = () => {
    setModal(true);
  }

  const onError = (err) => {
    setErrorMessage('');
    if (typeof err !== "undefined") {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo esta incorreto");
    }
  };

  const [isLoading, setRequest] = useRequest(onAction, onError, '/api/ajuda/avaliar');

  return (
    <>
      <Head>
        <title>
          Computoria: Avaliação
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle={`Avaliar ${usuario.matricula === ajuda.matricula_tutor ? ajuda.nome_aluno : ajuda.nome_tutor}`} />
      <Widget>
        <Modal title={'Computoria'} body={sucessBody()}
          open={showModal} setOpen={setModal} btns={buttonModal()} />
        <Form
          setAction={setRequest}
          isLoading={isLoading}
          message={errorMessage}
          ajuda={ajuda}
          usuario={usuario} />
      </Widget>
    </>
  )
};

export default Avaliar;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/ajuda/id/${context.params.id}`, {
    headers: req.headers
  });
  const response2 = await get(`/api/usuario`, {
    headers: req.headers
  });
  if (!response1.data.ajuda && !response2.data.usuario) {
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
  return {
    props: {
      ajuda: response1.data.ajuda,
      usuario: response2.data.usuario,
    },
  }
}
