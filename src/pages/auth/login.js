import { useDispatch } from "react-redux";
import { useState } from "react";
import Router from "next/router";
import Head from "next/head";

import Logo from "../../components/login/logo";
import Text from "../../components/login/text";
import Footer from "../../components/login/footer";
import Form from "../../components/login/form";
import { useRequest } from "../../hooks/auth";

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onLogin = (data) => {
    dispatch({
      type: "LOGIN",
      auth: {
        username: data.username,
      }
    });

    if (data.redirect) {
      Router.push(data.redirect);
    } else {
      Router.push("/");
    }
  };

  const onClick = () => {
    Router.push('/auth/signup')
  }

  const onError = (err) => {
    console.error(err);
    setErrorMessage("");
    if (typeof err !== "undefined" && err.error) {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("User or password incorrect");
    }
  };

  const [isLoading, setRequest] = useRequest(onLogin, onError, '/api/auth/login');

  return (
    <>
      <Head>
        <title>Computoria: Login</title>
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
          <p className="text-2xl font-bold text-blue-500 mb-4">
            Login em Computoria
          </p>
          <div className="w-full mb-4">
          </div>
          <Form setLogin={setRequest} isLoading={isLoading}
            message={errorMessage} />
          <div className="pt-4 pb-4 flex flex-row">
            <span
              className="text-secondary text-white mr-1">Esqueceu sua senha?
            </span>
            <span>
              <a href="/auth/forgot" className="link">Clique aqui</a>
            </span>
          </div>
          <button
            className="btn btn-default bg-green-500 hover:bg-green-600 text-white btn-rounded btn-icon"
            style={{ width: "250px" }}
            onClick={onClick}>
            <p >Criar nova conta</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default LogIn;