import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import { get } from '../../lib/api';

const AceitarMonitor = ({ setAction, isLoading, pendencias }) => {
    const [csrf, setCsrf] = useCsrf(null);
    const { handleSubmit, errors, register, watch } = useForm();

    useEffect(() => {
        setCsrf();
    });

    return (
        <>
            <form
                onSubmit={handleSubmit((data) => {
                    setAction(data);
                })}
                className="form flex flex-wrap w-full">
                <div className="w-full">

                    <div className="form-element" key="container-1">
                        <div className="form-label">Solicitações</div>
                        <div className="block">
                            {pendencias.map((option, j) => (
                                <label key={`checkbox-${j}`}
                                    className="flex items-center justify-start space-x-2">
                                    <input
                                        ref={register({
                                            required: true
                                        })}
                                        type="checkbox"
                                        value={`${option.nome}`}
                                        name="solicitacao"
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
                        className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
                        {isLoading
                            ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                            : null}
                        <p>Adicionar</p>
                    </button>

                </div>
            </form>
        </>
    );
};

export default AceitarMonitor;

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const response1 = await get(`/api/monitoria/solicitacoes`, {
        headers: req.headers,
    });
    return {
        props: {
            pendencias: response1.data.pendencias
        }
    }
}