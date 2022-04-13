import Alert from "../alerts";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";

const Form = ({ message = null, setSubmit, isLoading, usuario }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register } = useForm();

  React.useEffect(() => {
    setCsrf();
  });

  return (
    <>
      <div className="flex flex-col" style={{ width: "550px" }}>
        {message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-red-500 text-red-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <form
          onSubmit={handleSubmit((data) => {
            setSubmit({
              ...data,
              comentario: document.getElementsByName('comentario')[0]?.value,
            });
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Nome</div>
              <input
                name="nome"
                type="text"
                className={`form-input ${errors["nome"] ? "border-red-500" : ""
                  }`}
                defaultValue={usuario.nome}
                readOnly
              />
            </div>

            <div className="form-element" key="container-1">
              <div className="form-label text-white">Matricula</div>
              <input
                name="matricula"
                type="text"
                className={`form-input ${errors["matricula"] ? "border-red-500" : ""
                  }`}
                defaultValue={usuario.matricula}
                readOnly
              />
            </div>

            <div className="form-element" key="container-2">
              <div className="form-label text-white">Comentario</div>
              <textarea
                ref={register({
                  required: 'Insira seu Comentario',
                  minLength: {
                    value: 10,
                    message: 'Seu comentario deve ter pelo menos 10 caracteres',
                  },
                })}
                name="comentario"
                className={`form-input ${errors["comentario"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira seu Comentario"
                rows={5}
              ></textarea>
              {errors["comentario"] && (
                <div className="form-error">{errors["comentario"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                : null}
              <p>Enviar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
