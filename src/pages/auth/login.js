import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import {Router, useRouter} from "next/router";
import Head from "next/head";
import absoluteUrl from 'next-absolute-url'

import Logo from "../../components/login/logo";
import Text from "../../components/login/text";
import Footer from "../../components/login/footer";
import Form from "../../components/login/form";
import { useLogin } from "../../hooks/auth";

const LogIn = () => {
  const { query } = useRouter();
  const { config } = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  );

  let { name } = { ...config };

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const onLogin = (data) => {
    dispatch({
      type: "LOGIN",
      auth: {
        username: data.user.username,
        token: data.token,
        permissions: data.permissions.join(","),
        team: data.team
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
    setErrorMessage("User or password incorrect");
  };

  const [isLoading, setLogin] = useLogin(onLogin, onError);

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
            Login em {name} 
          </p>
          <div className="w-full mb-4">
          </div>
          <Form setLogin={setLogin} isLoading={isLoading}
                message={errorMessage}/>
          <div className="pt-4 pb-4 flex flex-row">
            <span
              className="text-secondary mr-1">Esqueceu sua senha?</span>
            <span>
              <Link href="/forgot">
                <a className="link">Clique aqui</a>
              </Link>
            </span>
          </div>
          <button
            className="btn btn-default bg-green-500 hover:bg-green-600 text-white btn-rounded btn-icon" 
            style={{ width: "250px"}} 
            onClick={onClick}>
              Criar nova conta
          </button>
        </div>
      </div>
    </>
  );
};

export default LogIn;