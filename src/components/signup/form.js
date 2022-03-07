import React, { useRef } from "react";
import Alert from "../alerts";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import cpf from "cpf";
import * as email from 'email-validator';

const Form = ({ message = null, setSignup, isLoading , cursos}) => {
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
            setSignup(data);
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Nome</div>
              <input
                ref={register({
                  required: 'Insira seu nome',
                  minLength: {
                    value: 10,
                    message: 'Seu nome deve ter pelo menos 10 caracteres'
                  }
                })}
                name="nome"
                type="text"
                className={`form-input ${
                  errors["nome"] ? "border-red-500" : ""
                }`}
                placeholder="Insira seu nome completo"
              />
              {errors["nome"] && (
                <div className="form-error">{errors["nome"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-1">
              <div className="form-label text-white">CPF</div>
              <input
                ref={register({
                  required: 'Insira seu CPF',
                  minLength: {
                    value: 11,
                    message: 'Seu CPF deve ter 11 caracteres',
                  },
                  validate: (value) => {
                    return cpf.isValid(value) || "CPF inválido"
                  }
                })}
                name="cpf"
                type="text"
                className={`form-input ${
                  errors["cpf"] ? "border-red-500" : ""
                }`}
                placeholder="Insira seu CPF"
              />
              {errors["cpf"] && (
                <div className="form-error">{errors["cpf"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-2">
              <div className="form-label text-white">E-mail</div>
              <input
                ref={register({
                  required: 'Insira seu E-mail',
                  minLength: {
                    value: 10,
                    message: 'Seu E-mail deve ter pelo menos 10 caracteres'
                  },
                  validate: (value) => {
                    return email.validate(value) || "E-mail inválido"
                  }
                })}
                name="email"
                type="text"
                className={`form-input ${
                  errors["email"] ? "border-red-500" : ""
                }`}
                placeholder="Insira seu E-mail"
              />
              {errors["email"] && (
                <div className="form-error">{errors["email"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-3">
              <div className="form-label text-white">Curso</div>
              <select
                ref={register({
                  required: 'Selecione um curso',
                })}
                name="curso"
                className={`form-select ${
                  errors["curso"] ? "border border-red-500" : ""
                }`}>
                {cursos.map((option, i) => (
                  <option key={i} value={option.nome}>
                    {option.sigla + ' - ' + option.nome}
                  </option>
                ))}
              </select>
              {errors["curso"] && (
                <div className="form-error">{errors["curso"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-4">
              <div className="form-label text-white">Matricula</div>
              <input
                ref={register({
                  required: 'Insira sua Matricula',
                  minLength: {
                    value: 8,
                    message: 'Seu Matricula deve ter 8 caracteres'
                  }
                })}
                name="matricula"
                type="text"
                className={`form-input ${
                  errors["matricula"] ? "border-red-500" : ""
                }`}
                placeholder="Insira sua Matricula"
              />
              {errors["matricula"] && (
                <div className="form-error">{errors["matricula"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-5">
              <div className="form-label text-white">Senha</div>
              <input
                ref={register({
                  required: 'Insira sua Senha',
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
                placeholder="Insira sua senha"
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
                <p>Cadastrar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
