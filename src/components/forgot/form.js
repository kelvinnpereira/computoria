import Alert from "../alerts";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";

const Form = ({ message = null, setForgot, isLoading }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register, watch} = useForm();

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
            setForgot(data);
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Insira seu email ou CPF para receber o e-mail de recuperação.</div>
              <input
                ref={register({
                  required: 'Insira seu CPF ou E-mail',
                })}
                name="user"
                type="text"
                className={`form-input ${
                  errors["user"] ? "border-red-500" : ""
                }`}
                placeholder="Insira seu CPF ou E-mail"
              />
              {errors["user"] && (
                <div className="form-error">{errors["user"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2"/>
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
