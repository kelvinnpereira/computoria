import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";

import Modal from "../modals";
import Router from "next/router";

const RemoverMonitor = ({ setAction, isLoading, pendencias }) => {
    const [csrf, setCsrf] = useCsrf(null);
    const { handleSubmit, errors, register, watch } = useForm();

    useEffect(() => {
        setCsrf();
    });

    const [showModal, setModal] = useState(false);

    const sucessBody = () => {
        return (
            <div class="relative p-4 w-full text-center">
                <span class="h-12 w-12 mx-auto my-4 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="stroke-current text-green-500" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
                <div class="flex flex-col w-full mb-4">
                    <div class="text-lg mb-2 font-bold">Monitor removido com sucesso</div>
                </div>
            </div>)
    }

    const onClick = (e) => {
        Router.push('/');
    }

    const buttonModal = () => {
        return (
            <button onClick={onClick} class="btn btn-default btn-rounded bg-blue-500 text-white hover:bg-blue-600 w-full" type="button">Ok</button>
        );
    }

    return (
        <>
            <Modal title={'Computoria'} body={sucessBody()} open={showModal} setOpen={setModal} btns={buttonModal()} />
            {
                pendencias?.length == 0
                    ?
                    <div className="w-full mb-4">
                        Sem monitores aprovados no momento
                    </div>
                    :
                    <form
                        onSubmit={handleSubmit((data) => {
                            setAction(data);
                            setModal(true);
                        })}
                        className="form flex flex-wrap">
                        <div className="w-full">
                            <div className="form-element" key="container-1">
                                <div className="form-label">Monitores</div>
                                <div className="block">
                                    {pendencias.map((option, j) => (
                                        <label key={`checkbox-${j}`}
                                            className="flex items-center justify-start space-x-2">
                                            <input
                                                ref={register({
                                                    required: true
                                                })}
                                                type="checkbox"
                                                value={option.matricula}
                                                name="matricula"
                                                className={`form-checkbox h-4 w-4}`}
                                            />
                                            <span>
                                                {`${option.sigla} - ${option.nome} - ${option.matricula}`}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

                            <button
                                className="w-56 btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
                                {isLoading
                                    ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                                    : null}
                                <p>Remover</p>
                            </button>

                        </div>
                    </form>
            }
        </>
    );
};

export default RemoverMonitor;