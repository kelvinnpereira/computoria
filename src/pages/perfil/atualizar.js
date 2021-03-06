import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from 'react';

import { useRequest } from "../../hooks/auth";
import { get } from '../../lib/api';

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import Modal from "../../components/modals";
import Email from "../../components/perfil/email";
import Conta from "../../components/perfil/conta";
import Senha from "../../components/perfil/senha";
import Horarios from "../../components/horarios/pick";

const Atualizar = ({ usuario, cursos, horarios }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    let url = window.location.href;
    let index = url.indexOf('#');
    if (index !== -1) {
      let item = document.getElementById(url.substring(index));
      if (item) {
        item.click();
      }
    }
  })

  const sucessBody = () => {
    return (
      <div class="relative p-4 w-full text-center">
        <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <div class="flex flex-col w-full mb-4">
          <div class="text-lg mb-2 font-bold">Perfil atualizado com sucesso</div>
        </div>
      </div>)
  }

  const onClick = (e) => {
    Router.push('/perfil');
  }

  const buttonModal = () => {
    return (
      <button onClick={onClick} class="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full" type="button">
        Ir para o perfil
      </button>
    );
  }

  const onAction = () => {
    setModal(true);
    setIsLoading(false);
  }

  const onError = (err) => {
    setErrorMessage('');
    if (typeof err !== "undefined") {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo esta incorreto");
    }
  };

  const [isLoadingConta, atualizarConta] = useRequest(onAction, onError, '/api/atualizar_conta');
  const [isLoadingHorarios, atualizarHorarios, setIsLoading] = useRequest(onAction, onError, '/api/disponibilidade/adicionar');
  const [isLoadingEmail, atualizarEmail] = useRequest(onAction, onError, '/api/atualizar_email');
  const [isLoadingSenha, atualizarSenha] = useRequest(onAction, onError, '/api/atualizar_senha');

  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso)
  const tabs = [
    {
      title: 'Conta',
      index: 0,
      content:
        <Conta
          setAction={atualizarConta}
          isLoading={isLoadingConta}
          message={errorMessage}
          usuario={usuario}
          cursos={cursos}
        />
    },
    {
      title: 'Horarios',
      index: 1,
      content:
        <Horarios
          horarios={horarios}
          setAction={atualizarHorarios}
          isLoading={isLoadingHorarios}
          message={errorMessage}
        />
    },
    {
      title: 'Email',
      index: 2,
      content:
        <Email
          setAction={atualizarEmail}
          isLoading={isLoadingEmail}
          message={errorMessage}
          usuario={usuario}
        />
    },
    {
      title: 'Senha',
      index: 3,
      content:
        <Senha
          setAction={atualizarSenha}
          isLoading={isLoadingSenha}
          message={errorMessage}
        />
    }
  ];

  return (
    <>
      <Head>
        <title>
          Computoria: Atualizar Perfil
        </title>
      </Head>
      <SectionTitle subtitle="Atualizar Perfil" />

      <Widget>
        <Modal title={'Computoria'} body={sucessBody()} open={showModal} setOpen={setModal} btns={buttonModal()} />
        <div className="flex flex-row m-4">
          <img src='/images/avatar_default.png' alt='Foto do usu??rio' className='rounded-full ring-blue' />
          <div className="pl-4">
            <p className="text-xl font-bold">{usuario.nome}</p>
            <p className="text-xs uppercase font-light text-white">{curso.nome}</p>
          </div>
        </div>
        <UnderlinedTabs tabs={tabs} />
      </Widget>
    </>
  )
};

export default Atualizar;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/usuario`, {
    headers: req.headers
  });
  const response2 = await get('/api/cursos');
  const response3 = await get('/api/disponibilidade/listar', {
    headers: req.headers
  });
  if (
    !response1.data?.usuario ||
    !response2.data?.cursos ||
    !response3.data?.horarios
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
      usuario: response1.data.usuario,
      cursos: response2.data.cursos,
      horarios: response3.data.horarios,
    },
  }
}