import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { UnderlinedTabs } from "../../../components/tabs";
import Agenda from "../../../components/agenda/index";
import SolicitacoesRecebidas from "../../../components/solicitacoes/recebidas";
import SolicitacoesEnviadas from "../../../components/solicitacoes/enviadas";
import Aulas from "../../../components/ajuda/aula";
import Tutorias from "../../../components/ajuda/tutoria";
import Historico from "../../../components/ajuda/historico";
import Modal from '../../../components/modals';

import { get } from "../../../lib/api";
import { useRequest } from "../../../hooks/auth";
import { useEffect, useState } from "react";
import Router from "next/router";

const sucessBody = () => {
  return (
    <div class="relative p-4 w-full text-center">
      <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
      <div class="flex flex-col w-full mb-4">
        <div class="text-lg mb-2 font-bold">Ação executada com sucesso</div>
      </div>
    </div>
  )
}

const buttonModal = () => {
  return (
    <button
      onClick={(e) => Router.push('/home')}
      className="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
      type="button">
      Home
    </button>
  );
}

const avaliacaoBody = (usuario, agenda) => {
  return (
    <div class="relative p-4 w-full text-center">
      <div class="flex flex-col w-full mb-4">
        <div class="text-lg mb-2 font-bold">Você tem avaliações pendentes. Gostaria de avaliar o tutor agora?</div>
        Obs: Não é possível marcar outra ajuda com avaliações pendentes.
      </div>
      <Historico usuario={usuario} agenda={agenda} width='w-full' />
    </div>
  )
}

const avaliacaoButton = () => {
  return (
    <button
      onClick={(e) => window.location.reload()}
      className="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
      type="button">
      Agora Não
    </button>
  );
}

const Home = ({ usuario, cursos, horarios, agenda }) => {
  const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setModal] = useState(false);
  const [showModalAvaliacao, setModalAvaliacao] = useState(false);

  const onAction = (data) => {
    setModal(true);
    // window.setInterval(() => {
    //   window.location.reload();
    // }, 3000);
  };

  const onError = (err) => {
    console.error(err);
    setErrorMessage("");
    if (typeof err !== "undefined" && err.error) {
      setErrorMessage(err.error);
    } else {
      setErrorMessage("Algo de errado aconteceu :(");
    }
  };

  const [isLoadingAceitar, setRequestAceitar] = useRequest(onAction, onError, '/api/ajuda/aceitar');
  const [isLoadingRemover, setRequestRemover] = useRequest(onAction, onError, '/api/ajuda/recusar');
  const [isLoadingAlunoCancelar, setAlunoCancelar] = useRequest(onAction, onError, '/api/ajuda/aluno_cancelar');
  const [isLoadingTutorCancelar, setTutorCancelar] = useRequest(onAction, onError, '/api/ajuda/tutor_cancelar');
  const [isLoadingPopup, setPopup] = useRequest((data) => console.log('sucess popup'), (data) => console.log('error popup'), '/api/ajuda/popup');
  const concluida = agenda?.filter(item => item.status == 'concluida' && usuario.matricula === item.matricula_aluno && item.nota_aluno === null)

  const tabs = [
    {
      title: "Agenda",
      index: 0,
      content: <Agenda usuario={usuario} diasUteis={horarios} agenda={agenda} />
    },
    {
      title: "Aulas Agendadas",
      index: 1,
      content: <Aulas
        usuario={usuario}
        agenda={agenda}
        cancelar={setAlunoCancelar} />
    },
    {
      title: "Tutorias Agendadas",
      index: 2,
      content: <Tutorias
        usuario={usuario}
        agenda={agenda}
        cancelar={setTutorCancelar} />
    },
    {
      title: "Solicitações de Ajudas Enviadas",
      index: 3,
      content: <SolicitacoesEnviadas
        usuario={usuario}
        agenda={agenda}
        cancelar={setAlunoCancelar} />
    },
    {
      title: "Solicitações de Ajudas Recebidas",
      index: 4,
      content: <SolicitacoesRecebidas
        usuario={usuario}
        agenda={agenda}
        aceitar={setRequestAceitar}
        recusar={setRequestRemover} />
    },
    {
      title: "Historico de Ajudas",
      index: 5,
      content: <Historico
        usuario={usuario}
        agenda={agenda} />
    },
  ];

  useEffect(() => {
    if (concluida.length > 0 && concluida[0].mostrar_popup) {
      setModalAvaliacao(true);
      setPopup({id: concluida[0].id});
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home" />
      <Widget>
        <Modal
          title={'Ajuda'}
          body={sucessBody()}
          open={showModal}
          setOpen={setModal}
          btns={buttonModal()} />
        <Modal
          title={'Avaliações pendentes'}
          body={avaliacaoBody(usuario, concluida)}
          open={showModalAvaliacao}
          setOpen={setModalAvaliacao}
          btns={avaliacaoButton()}
          maxWidth="w-1/3" />
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
  const response1 = await get(`/api/usuario`, {
    headers: req.headers,
  });
  const response2 = await get('/api/cursos');
  const response3 = await get('/api/disponibilidade/listar', {
    headers: req.headers
  });
  const response4 = await get('/api/ajuda/agenda', {
    headers: req.headers
  });
  if (
    !response1.data?.usuario ||
    !response2.data?.cursos ||
    !response3.data?.horarios ||
    !response4.data?.agenda
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
      agenda: response4.data.agenda,
    }
  }
}
