import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';
import Cookies from 'js-cookie';
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

const ListarProficiencia = ({ disciplinas }) => {
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

const Perfil = ({ usuario, cursos, disciplinas }) => {
  const { query } = useRouter();
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  const tabs = [
    { title: 'Conta', index: 0, content: <Conta usuario={usuario} curso={curso} /> },
    { title: 'Redes Sociais', index: 1, content: <Redes /> },
    { title: 'Proficiencias', index: 2, content: <ListarProficiencia disciplinas={disciplinas} /> }
  ];

  const actions = (
    query.matricula === Cookies.get('user') ?
      <button
        onClick={() => {
          Router.push('/perfil/atualizar');
        }}
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
        Atualizar Perfil
      </button> :
      <button
        onClick={() => {
          Router.push(`/denunciar/${query.matricula}`);
        }}
        className="btn btn-default bg-red-500 hover:bg-red-600 text-white btn-rounded btn-icon">
        Denunciar Perfil
      </button>
  );

  return (
    <>
      <Head>
        <title>
          Computoria: Perfil
        </title>
      </Head>
      <SectionTitle title='Visualizar' subtitle="Perfil" actions={actions} />

      <Widget>
        <div className="flex flex-row m-4">
          <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
          <div className="pl-4">
            <p className="text-xl font-bold">{usuario.nome}</p>
            <p className="text-xs uppercase font-light text-white">{curso.nome}</p>
          </div>
        </div>
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
      disciplinas: response3.data.disciplinas,
    },
  }
}