import React, { useRef } from "react";
import Alert from "../alerts";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";

const Form = ({ message = null, setRestart, isLoading }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register, watch} = useForm();

  const senha = useRef({});
  senha.current = watch("senha", "");

  React.useEffect(() => {
    setCsrf();
  });

  return (
    <>
      <div className="flex flex-col" style={{ width: "250px" }}>
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
            setRestart(data);
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">
            <div className="form-element" key="container-5">
              <div className="form-label text-white">Nova Senha</div>
              <input
                ref={register({
                  required: 'Insira sua nova senha',
                  minLength: {
                    value: 8,
                    message: 'Seu senha deve ter no minimo 8 caracteres'
                  }
                })}
                name="senha"
                type="password"
                className={`form-input ${
                  errors["senha"] ? "border-red-500" : ""
                }`}
                placeholder="Insira sua nova senha"
              />
              {errors["senha"] && (
                <div className="form-error">{errors["senha"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-6">
              <div className="form-label text-white">Confirme sua Senha</div>
              <input
                ref={register({
                  required: "Confirme sua Senha",
                  validate: value => value === senha.current || "As senhas não combinam"
                })}
                name="confirmar_senha"
                type="password"
                className={`form-input ${
                  errors["confirmar_senha"] ? "border-red-500" : ""
                }`}
                placeholder="Confirme sua Senha"
              />
              {errors["confirmar_senha"] && (
                <div className="form-error">{errors["confirmar_senha"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2"/>
                : null}
                <p>Restaurar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
