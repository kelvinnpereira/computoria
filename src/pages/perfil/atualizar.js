import Head from "next/head";
import React from 'react';
import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";

const Conta = () => {
  return (
    <form className="p-4">
      <div className="form-label">Nome</div>
      <input
        name="nome"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Sobrenome</div>
      <input
        name="sobrenome"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Curso</div>
      <input
        name="curso"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Telefone</div>
      <input
        name="telefone"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon mt-4"
      >
        Enviar
      </button>
    </form>
  )
}
const Email = () => {
  return (
    <form className="p-4">
      <div className="form-label">E-mail atual</div>
      <input
        name="emailAtual"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Novo E-mail</div>
      <input
        name="emailNovo"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon mt-4"
      >
        Enviar
      </button>
    </form>
  )
}
const Senha = () => {
  return (
    <form className="p-4">
      <div className="form-label">Senha atual</div>
      <input
        name="senhaAtual"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Nova senha</div>
      <input
        name="senhaNova"
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <div className="form-label">Confirme a nova senha</div>
      <input
        type="text"
        className="form-input bg-gray-800 m-2 w-1/2"
      />
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon mt-4"
      >
        Enviar
      </button>
    </form>
  )
}

const atualizar = () => {

  const tabs = [
    { title: 'Conta', index: 0, content: <Conta /> },
    { title: 'Email', index: 1, content: <Email /> },
    { title: 'Senha', index: 2, content: <Senha /> }]

  return (
    <>
      <Head>
        <title>Computoria: Nome Usuário</title>
      </Head>
      <SectionTitle title='Perfil' subtitle='Atualizar Cadastro' />

      <div className="m-6">
        <UnderlinedTabs tabs={tabs} />
      </div>

    </>

  )
};

export default atualizar;