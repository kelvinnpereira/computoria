import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';
import Router from "next/router";
import Agenda from "../../components/agenda/index";
import Avaliações from '../../components/d-board/lists/avaliacoes';
import Horarios from "../../components/horarios/show";

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

// const Redes = () => {
//   return (
//     <></>
//   )
// }

const ListarDisciplinas = ({ disciplinas }) => {
  return (
    <>
      {
        disciplinas.length > 0
          ?
          <List1 items={disciplinas?.map((item) => {
            return {
              title: item.sigla + " - " + item.nome
            }
          })} />
          :
          <p>Você não tem disciplinas nessa lista</p>
      }
    </>
  );
};

const Perfil = ({ usuario, cursos, especialidades, dificuldades, horarios, agenda }) => {
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  let index = 0;
  const aluno = agenda?.filter(item => item.status === 'concluida' && item.matricula_aluno === usuario.matricula && item.nota_tutor !== null);
  const tutor = agenda?.filter(item => item.status === 'concluida' && item.matricula_tutor === usuario.matricula && item.nota_aluno !== null);
  const media_aluno = aluno?.length === 0 ? 0 : aluno.map(item => item.nota_tutor).reduce((a, b) => a + b, 0) / aluno.length;
  const media_tutor = tutor?.length === 0 ? 0 : tutor.map(item => item.nota_aluno).reduce((a, b) => a + b, 0) / tutor.length;
  const tabs = [
    {
      title: 'Conta',
      index: index++,
      content:
        <Conta usuario={usuario} curso={curso} />
    },
    // {
    //   title: 'Redes Sociais',
    //   index: index++,
    //   content: <Redes />
    // },
    {
      title: 'Agenda',
      index: index++,
      content: <Agenda usuario={usuario} diasUteis={horarios} agenda={agenda} />
    },
    {
      title: 'Horarios Disponiveis',
      index: index++,
      content: <Horarios horarios={horarios} />
    },
    {
      title: 'Especialidades',
      index: index++,
      content: <ListarDisciplinas disciplinas={especialidades} />
    },
    {
      title: 'Dificuldades',
      index: index++,
      content: <ListarDisciplinas disciplinas={dificuldades} />
    },
    {
      title: 'Avaliações como Tutor',
      index: index++,
      content: <Avaliações items={tutor.map((item) => {
        return {
          comentario: item.comentario_aluno,
          data: (new Date(item.data_inicio)).toLocaleDateString(),
          nota: item.nota_aluno,
          status: item.status,
        }
      })}
        media={media_tutor} />
    },
    {
      title: 'Avaliações como Aluno',
      index: index++,
      content: <Avaliações items={aluno.map((item) => {
        return {
          comentario: item.comentario_tutor,
          data: (new Date(item.data_inicio)).toLocaleDateString(),
          nota: item.nota_tutor,
          status: item.status,
        }
      })}
        media={media_aluno} />
    },
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
  const response3 = await get(`/api/especialidade/listar`, {
    headers: req.headers
  });
  const response4 = await get(`/api/dificuldade/listar`, {
    headers: req.headers
  });
  const response5 = await get('/api/disponibilidade/listar', {
    headers: req.headers
  });
  const response6 = await get('/api/ajuda/agenda', {
    headers: req.headers
  });
  if (
    !response1.data?.usuario ||
    !response2.data?.cursos ||
    !response3.data?.disciplinas ||
    !response4.data?.disciplinas ||
    !response5.data?.horarios ||
    !response6.data?.agenda
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
      especialidades: response3.data.disciplinas,
      dificuldades: response4.data.disciplinas,
      horarios: response5.data.horarios,
      agenda: response6.data.agenda
    },
  }
}