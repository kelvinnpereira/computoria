import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import { useRequest } from "@src/hooks/auth";
import Form from "../../components/disciplina/remover/form";
import { useState } from "react";
import { get } from '../../lib/api';
import Modal from '../../components/modals';
import Router from "next/router";

const RemoverProficiencia = ({ disciplinas }) => {
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
          <div class="text-lg mb-2 font-bold">Disciplina(s) removidas(s) com sucesso</div>
        </div>
      </div>)
  }

  const onClick = (e) => {
    Router.push('/proficiencia/listar');
  }

  const buttonModal = () => {
    return (
      <button onClick={onClick} class="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full" type="button">Listar Disciplinas</button>
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

  const [isLoading, setRequest] = useRequest(onAction, onError, '/api/proficiencia/remover');

  return (
    <>
      <Head>
        <title>
          Computoria: Remover Proficiencia
        </title>
      </Head>
      <SectionTitle title="Remover" subtitle="Proficiencia" />
      <Widget>
        <Modal title={'Computoria'} body={sucessBody()} open={showModal} setOpen={setModal} btns={buttonModal()} />
        <Form setAction={setRequest} isLoading={isLoading}
          message={errorMessage} disciplinas={disciplinas} />
      </Widget>
    </>
  );
};

export default RemoverProficiencia;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/proficiencia/listar`, {
    headers: req.headers
  });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}