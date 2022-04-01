import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';
import { useRouter } from "next/router";
import Router from "next/router";

const Conta = ({ usuario, curso }) => {
  return (
    <>
      <table className="table">
        <tbody>

          <tr key='nome'>
            <td> <b>Nome</b> </td>
            <td>{usuario.nome}</td>
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

const Perfil = ({ usuario, cursos, prof, improf }) => {
  const { query } = useRouter();
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  const tabs = [
    { title: 'Conta', index: 0, content: <Conta usuario={usuario} curso={curso} /> },
    { title: 'Horarios', index: 1, content: <></> },
    { title: 'Redes Sociais', index: 2, content: <Redes /> },
    { title: 'Proficiencias', index: 3, content: <ListarDisciplinas disciplinas={prof} /> },
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
            Router.push(`/denunciar/${query.matricula}`);
          }}
          className="btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon">
          Denunciar Perfil
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
            <button
              onClick={() => {
                Router.push(`/agendar/${query.matricula}`);
              }}
              className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              Solicitar Ajuda
            </button>
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
  const response1 = await get(`/api/usuario/${context.params.matricula}`, {
    headers: req.headers
  });
  const response2 = await get('/api/cursos');
  const response3 = await get(`/api/proficiencia/listar/${context.params.matricula}`, {
    headers: req.headers
  });
  return {
    props: {
      usuario: response1.data.usuario,
      cursos: response2.data.cursos,
      prof: response3.data.disciplinas,
    },
  }
}