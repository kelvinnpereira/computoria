import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Form from "../../components/denunciar/form";
import Modal from '../../components/modals';
import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";

import { useRequest } from "../../hooks/auth";
import { get } from '../../lib/api';

const Denunciar = ({ usuario }) => {
  const { query } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  const onDenunciar = (data) => {
    setModal(true);
  };

  const onError = (err) => {
    console.error(err);
    setErrorMessage("");
    if (typeof err !== "undefined" && err.error) {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("User or password incorrect");
    }
  };

  const [isLoading, setRequest] = useRequest(onDenunciar, onError, '/api/denunciar/' + query.matricula);

  const sucessBody = () => {
    return (
      <div class="relative p-4 w-full text-center">
        <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <div class="flex flex-col w-full mb-4">
          <div class="text-lg mb-2 font-bold">Sua denuncia foi enviado com sucesso</div>
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

  return (
    <>
      <Head>
        <title>
          Computoria: Denunciar
        </title>
      </Head>
      <SectionTitle subtitle="Denunciar" />
      <Widget>
        <Modal title={'Computoria'} body={sucessBody()} open={showModal} setOpen={setModal} btns={buttonModal()} />
        <Form setSubmit={setRequest} isLoading={isLoading} message={errorMessage} usuario={usuario} />
      </Widget>
    </>
  );
};

export default Denunciar;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/usuario/${context.params.matricula}`, {
    headers: req.headers
  });
  return {
    props: { usuario: response.data.usuario },
  }
}