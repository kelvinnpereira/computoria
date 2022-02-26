import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

import Logo from "../../components/signup/logo";
import Text from "../../components/signup/text";
import Footer from "../../components/signup/footer";
import Form from "../../components/signup/form";
import { useSignup } from "../../hooks/auth";

const SignUp = ({data}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSignup = (data) => {
    if (data.redirect) {
      Router.push(data.redirect);
    } else {
      Router.push("/");
    }
  };

  const onError = (err) => {
    console.error(err);
    if (typeof err !== "undefined") {
      console.error(err.error);
      setErrorMessage('Erro ' + err.error);
    } else {
      setErrorMessage("Algo esta incorreto");
    }
  };

  const [isLoading, setSignup] = useSignup(onSignup, onError);

  return (
    <>
      <Head>
        <title>Computoria</title>
      </Head>
      <div className="w-full flex flex-row h-screen overflow-hidden">
        <div
          className="hidden lg:flex lg:flex-col w-1/2 text-white p-8 items-start justify-between relative bg-login-2">
          <Logo/>
          <Text/>
          <Footer/>
        </div>
        <div
          className="w-full lg:w-1/2 bg-white p-8 lg:p-24 flex flex-col items-start justify-center">
          <p className="text-2xl font-bold text-blue-500 mb-4">
            Cadastre-se
          </p>
          <div className="w-full mb-4">
          </div>
          <Form setSignup={setSignup} isLoading={isLoading}
                message={errorMessage} cursos={data.cursos}/>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch('http://localhost:3000/api/auth/signup');
  const data = await response.json();
  return {
    props: {data: data},
  }
}

export default SignUp;
