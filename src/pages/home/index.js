import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { UnderlinedTabs } from "../../components/tabs";
import { cookieToDict, get } from "../../lib/api";

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

const Home = ({ usuario, disciplinas, cursos }) => {
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);

  const tabs = [
    { title: "Aulas", index: 0 },
    { title: "Tutorias", index: 1 },
    { title: "Solicitações", index: 2 },
    { title: "Horários", index: 3 }
  ]

  return (
    <>
      <Head>
        <title>
          Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home" />
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

export default Home;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookie = cookieToDict(req.headers.cookie);
  const response1 = await get(`api/proficiencia/listar/${cookie.user}`, {
    headers: { cookie: req.headers.cookie },
  });
  const response2 = await get(`/api/usuario/${cookie.user}`, {
    headers: { cookie: req.headers.cookie },
  });
  const response3 = await get('/api/cursos');

  return {
    props: {
      disciplinas: response1.data.disciplinas,
      usuario: response2.data.usuario,
      cursos: response3.data.cursos
    }
  }
}
