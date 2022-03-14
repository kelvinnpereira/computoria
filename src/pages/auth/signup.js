import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

import Logo from "@src/components/signup/logo";
import Text from "@src/components/signup/text";
import Footer from "@src/components/signup/footer";
import Form from "../../components/signup/form";
import { useRequest } from "@src/hooks/auth";
import Modal from '@src/components/modals';
import { get } from '../../lib/api';

const SignUp = ({ cursos }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  const onSignup = (data) => {
    setModal(true);
  };

  const onError = (err) => {
    setErrorMessage('');
    if (typeof err !== "undefined") {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo esta incorreto");
    }
  };

  const sucessBody = () => {
    return (
      <div class="relative p-4 w-full text-center">
        <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <div class="flex flex-col w-full mb-4">
          <div class="text-lg mb-2 font-bold">O Cadastro foi realizado com sucesso</div>
        </div>
      </div>)
  }

  const onClick = (e) => {
    Router.push('/auth/login');
  }

  const buttonModal = () => {
    return (
      <button onClick={onClick} class="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full" type="button">Login</button>
    );
  }

  const [isLoading, setRequest] = useRequest(onSignup, onError, '/api/auth/signup');

  return (
    <>
      <Head>
        <title>Computoria: Cadastre-se</title>
      </Head>
      <div className="w-full flex flex-row h-screen overflow-hidden">
        <div
          className="hidden lg:flex lg:flex-col w-1/2 text-white p-8 items-start justify-between relative bg-login-2">
          <Logo />
          <Text />
          <Footer />
        </div>
        <div
          className="w-full lg:w-1/2 p-8 lg:p-24 flex flex-col items-start justify-center"
          style={{ background: "rgba(17,24,39)" }}>
          <Modal title={'Computoria'} body={sucessBody()} open={showModal} setOpen={setModal} btns={buttonModal()} />
          <p className="text-2xl font-bold text-blue-500 mb-4">
            Cadastre-se
          </p>
          <div className="w-full mb-4">
          </div>
          <Form setSignup={setRequest} isLoading={isLoading}
            message={errorMessage} cursos={cursos} />
        </div>
      </div>
    </>
  );
};

export default SignUp;

export const getServerSideProps = async (context) => {
  const response = await get('/api/auth/signup');
  return {
    props: { cursos: response.data.cursos },
  }
}