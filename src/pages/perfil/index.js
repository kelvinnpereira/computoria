import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import Router from "next/router";
import { get, cookieToDict } from '../../lib/api';

const Conta = ({ usuario, curso }) => {
  return (
    <>
      <table className="table">
        <tbody>
          {Object.keys(usuario).map((key) => {
            let [chave, valor] = key == 'sigla_curso' ? ['Curso', curso.nome] : [key, usuario[key]];
            return (
              <tr key={key}>
                <td> <b>{chave}</b> </td>
                <td>{valor}</td>
              </tr>
            )
          })}
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

const Index = ({ usuario, cursos }) => {
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  const tabs = [
    { title: 'Conta', index: 0, content: <Conta usuario={usuario} curso={curso} /> },
    { title: 'Redes Sociais', index: 1, content: <Redes /> }
  ];

  const actions = (
    <button
      onClick={() => {
        Router.push('/perfil/atualizar');
      }}
      className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
      Atualizar Perfil
    </button>
  );

  return (
    <>
      <Head>
        <title>
          Computoria: Perfil
        </title>
      </Head>
      <SectionTitle subtitle="Perfil" actions={actions} />
      
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

export default Index;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookie = cookieToDict(req.headers.cookie);
  const response1 = await get('/api/usuario', { params: { user: cookie.user } });
  const response2 = await get('/api/cursos');
  return {
    props: {
      usuario: response1.data.usuario,
      cursos: response2.data.cursos,
    },
  }
}