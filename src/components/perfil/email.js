import React, {useEffect} from "react";
import Alert from "../alerts";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import * as email from 'email-validator';

const Email = ({ message = null, setAction, isLoading, usuario }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register } = useForm();

  useEffect(() => {
    setCsrf();
  });

  return (
    <>
      <div className="flex flex-col" style={{ width: "450px" }}>
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
            setAction(data);
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-2">
              <div className="form-label text-white">E-mail Atual</div>
              <input
                ref={register({
                  required: 'Insira seu E-mail atual',
                  minLength: {
                    value: 10,
                    message: 'Seu E-mail deve ter pelo menos 10 caracteres'
                  },
                  validate: (value) => {
                    return email.validate(value) || "E-mail inválido"
                  }
                })}
                defaultValue={usuario.email}
                name="email_atual"
                type="text"
                className={`form-input ${errors["email"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira seu E-mail atual"
              />
              {errors["email"] && (
                <div className="form-error">{errors["email"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-2">
              <div className="form-label text-white">Novo E-mail</div>
              <input
                ref={register({
                  required: 'Insira seu novo E-mail',
                  minLength: {
                    value: 10,
                    message: 'Seu E-mail deve ter pelo menos 10 caracteres'
                  },
                  validate: (value) => {
                    return email.validate(value) || "E-mail inválido"
                  }
                })}
                name="novo_email"
                type="text"
                className={`form-input ${errors["email"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira seu novo E-mail"
              />
              {errors["email"] && (
                <div className="form-error">{errors["email"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                : null}
              <p>Atualizar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  );
}

export default Email;