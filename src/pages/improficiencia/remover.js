import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import { useRequest } from "@src/hooks/auth";
import Form from "../../components/disciplina/remover/form";
import { useState } from "react";
import { get } from '../../lib/api';

const Index = ({ disciplinas }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const actions = (
    <>
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon"
      >
        Refresh
      </button>
    </>
  );

  const onAction = () => {

  }

  const onError = (err) => {
    setErrorMessage('');
    if (typeof err !== "undefined") {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo esta incorreto");
    }
  };

  const [isLoading, setRequest] = useRequest(onAction, onError, '/api/improficiencia/remover');

  return (
    <>
      <Head>
        <title>
          Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Improficiencia" subtitle="Remover" actions={actions} />
      <Widget>
        <Form setAction={setRequest} isLoading={isLoading}
          message={errorMessage} disciplinas={disciplinas} />
      </Widget>
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const response = await get('/api/improficiencia/lista');
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}