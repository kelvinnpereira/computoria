import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';
import Router from "next/router";
import Agenda from "../../components/agenda/index";

const Conta = ({ usuario, curso }) => {
  return (
    <>
      <table className="table">
        <tbody>

          <tr key='nome'>
            <td> <b>Nome</b> </td>
            <td>{usuario.nome}</td>
          </tr>

          <tr key='cpf'>
            <td> <b>CPF</b> </td>
            <td>{usuario.cpf}</td>
          </tr>

          <tr key='matricula'>
            <td> <b>Matricula</b> </td>
            <td>{usuario.matricula}</td>
          </tr>

          <tr key='email'>
            <td> <b>E-mail</b> </td>
            <td>{usuario.email}</td>
          </tr>

          <tr key='curso'>
            <td> <b>Curso</b> </td>
            <td>{curso.nome}</td>
          </tr>

        </tbody>
      </table>
    </>
  )
}

const Redes = () => {
  return (
    <></>
  )
}

const ListarDisciplinas = ({ disciplinas }) => {
  return (
    <>
      <List1 items={disciplinas?.map((item) => {
        return {
          title: item.sigla + " - " + item.nome
        }
      })} />
    </>
  );
};

const Perfil = ({ usuario, cursos, prof, improf, horarios, agenda }) => {
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  const tabs = [
    { title: 'Conta', index: 0, content: <Conta usuario={usuario} curso={curso} /> },
    { title: 'Agenda', index: 1, content: <Agenda diasUteis={horarios} agenda={agenda} /> },
    { title: 'Redes Sociais', index: 2, content: <Redes /> },
    { title: 'Proficiencias', index: 3, content: <ListarDisciplinas disciplinas={prof} /> },
    { title: 'Improficiencias', index: 4, content: <ListarDisciplinas disciplinas={improf} /> },
    { title: 'Avaliações', index: 5, content: <></> },
  ];

  return (
    <>
      <Head>
        <title>
          Computoria: Perfil
        </title>
      </Head>
      <SectionTitle title='Visualizar' subtitle="Perfil" actions={
        <button
          onClick={() => {
            Router.push('/perfil/atualizar');
          }}
          className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
          Atualizar Perfil
        </button>
      } />
      <Widget>
        <div className="w-full mb-6 pt-3">
          <div className="flex flex-row items-center justify-start mb-4 pl-4">
            <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
            <div className="px-4">
              <p className="text-xl font-bold">{usuario.nome}</p>
              <p className="text-xs uppercase font-light text-white">{curso.nome}</p>
            </div>
          </div>
        </div >
        <UnderlinedTabs tabs={tabs} />
      </Widget>
    </>
  );
};

export default Perfil;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get(`/api/usuario`, {
    headers: req.headers
  });
  const response2 = await get('/api/cursos');
  const response3 = await get(`/api/proficiencia/listar`, {
    headers: req.headers
  });
  const response4 = await get(`/api/improficiencia/listar`, {
    headers: req.headers
  });
  const response5 = await get('/api/disponibilidade/listar', {
    headers: req.headers
  });
  const response6 = await get('/api/ajuda/listar', {
    headers: req.headers
  });
  return {
    props: {
      usuario: response1.data.usuario,
      cursos: response2.data.cursos,
      prof: response3.data.disciplinas,
      improf: response4.data.disciplinas,
      horarios: response5.data.horarios,
      agenda: response6.data.agenda
    },
  }
}