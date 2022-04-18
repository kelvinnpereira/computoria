import Head from "next/head";
import Router from "next/router";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import Form from "../../components/certificado/form";
import Modal from "../../components/modals";

import { get } from '../../lib/api';

import { useRequest } from "../../hooks/auth";
import {useState} from "react";

const Solicitar = ({ horas, usuario }) => {

    const sucessBody = () => {
        return (
            <div class="relative p-4 w-full text-center">
                <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
                <div class="flex flex-col w-full mb-4">
                    <div class="text-lg mb-2 font-bold">Certificado emitido com sucesso</div>
                </div>
            </div>
        )
    }

    const buttonModal = () => {
        return (
            <button
                onClick={(e) => Router.push('/certificado/listar')}
                className="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full"
                type="button">
                Seus certificados
            </button>
        );
    }

    const onAction = () => {
        setModal(true);
    }

    const onError = (err) => {
        setErrorMessage("");
        if (typeof err !== "undefined" && err.error) {
          setErrorMessage(err.error);
        } else {
          setErrorMessage("Algo de errado aconteceu :(");
        }
      };

    const [showModal, setModal] = useState(false);

    const [isLoadingSolicitar, setRequestSolicitar] = useRequest(onAction, onError, '/api/certificado/solicitar');

    return (
        <>
            <Head>
                <title>
                    Computoria: Listar Improficiencia
                </title>
            </Head>
            <SectionTitle title="Solicitar" subtitle="Certificado" />

            <Widget>
                <Modal
                    title={'Certificado'}
                    body={sucessBody()}
                    open={showModal}
                    setOpen={setModal}
                    btns={buttonModal()} />
                <div className="mb-4">Você possui <b>{horas} horas complementares</b> acumuladas</div>
                {horas >= 30 ? <Form solicitacao={setRequestSolicitar} matricula={usuario.matricula} /> : <p>Horas insuficientes pra emissão de certificado</p>}

            </Widget>
        </>
    )
}

export default Solicitar;

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const response1 = await get('/api/certificado/horas', { headers: req.headers });
    const response2 = await get(`/api/usuario`, {
        headers: req.headers
    });
    return {
        props: { horas: response1.data.horas, usuario: response2.data.usuario },
    }
}