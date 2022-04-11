import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

import Form from "../../../components/ajuda/tutor_reagendar";
import Modal from '../../../components/modals';
import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";

import { useRequest } from "../../../hooks/auth";
import { get } from '../../../lib/api';

const Agendar = ({ ajuda, horarios, agenda }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  const onAgendar = (data) => {
    setModal(true);
  };

  const onError = (err) => {
    console.error(err);
    setErrorMessage("");
    if (typeof err !== "undefined" && err.error) {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo de errado aconteceu :(");
    }
  };

  const [isLoading, setRequest] = useRequest(onAgendar, onError, '/api/ajuda/tutor_reagendar');

  const sucessBody = () => {
    return (
      <div class="relative p-4 w-full text-center">
        <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <div class="flex flex-col w-full mb-4">
          <div class="text-lg mb-2 font-bold">Sua solicitação de ajuda foi enviada com sucesso</div>
        </div>
      </div>
    )
  }

  const buttonModal = () => {
    return (
      <button
        onClick={(e) => Router.push('/home/usuario')}
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
          Computoria: Reagendar Ajuda
        </title>
      </Head>
      <SectionTitle title='Ajuda' subtitle="Reagendar" />
      <Widget>
        <Modal
          title={'Computoria'}
          body={sucessBody()}
          open={showModal}
          setOpen={setModal}
          btns={buttonModal()} />
        <Form
          setSubmit={setRequest}
          isLoading={isLoading}
          message={errorMessage}
          ajuda={ajuda}
          diasUteis={horarios}
          agenda={agenda} />
      </Widget>
    </>
  );
};

export default Agendar;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/ajuda/id/${context.params.id}`, {
    headers: req.headers
  });
  const ajuda = response.data?.ajuda;
  if (!ajuda) {
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
  const response1 = await get(`/api/disponibilidade/listar/${ajuda.matricula_tutor}`, {
    headers: req.headers
  });
  const response2 = await get('/api/ajuda/agenda', {
    headers: req.headers
  });
  const response3 = await get(`/api/ajuda/agenda/${ajuda.matricula_tutor}`, {
    headers: req.headers
  });
  if (
    !response1.data?.horarios ||
    !response2.data?.agenda || 
    !response3.data?.agenda
  ) {
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
  return {
    props: {
      ajuda: ajuda,
      horarios: response1.data.horarios,
      agenda: response2.data.agenda.concat(response3.data.agenda),
    },
  }
}