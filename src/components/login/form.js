import Alert from "../alerts";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import cpf from "cpf";
import * as email from 'email-validator';

const Form = ({ message = null, setLogin, isLoading }) => {
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
            setLogin(data);
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">CPF ou E-mail</div>
              <input
                ref={register({
                  required: 'Insira seu CPF ou E-mail',
                  validate: (value) => {
                    let username = /[a-zA-Z]/g.test(value) ? value : value.replace(/[^\d]+/g, '');
                    if (/^\d+$/.test(username)) {
                      return cpf.isValid(username) || "CPF inválido"
                    } else if (value.includes('@')) {
                      return email.validate(value) || "E-mail inválido"
                    } else {
                      return "Usuário inválido"
                    } 
                  }
                })}
                name="username"
                type="text"
                className={`form-input ${
                  errors["username"] ? "border-red-500" : ""
                }`}
                placeholder="Insira seu CPF ou E-mail"
              />
              {errors["username"] && (
                <div className="form-error">{errors["username"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-1">
              <div className="form-label text-white">Senha</div>
              <input
                ref={register({
                  required: 'Insira sua Senha',
                })}
                name="password"
                type="password"
                className={`form-input ${
                  errors["password"] ? "border-red-500" : ""
                }`}
                placeholder="Insira sua senha"
              />
              {errors["password"] && (
                <div className="form-error">{errors["password"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2"/>
                : null}
                <p>Entrar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
