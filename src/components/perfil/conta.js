import React, { useEffect } from "react";
import Alert from "../alerts";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import cpf from "cpf";

const Conta = ({ message = null, setAction, isLoading, usuario, cursos }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register } = useForm();

  useEffect(() => {
    setCsrf();
  });


  const validaNome = (value) => {
    const specialChar = ['.', ',', '"', '?', '!', ';', ':', '#', '$', '%', '&', '*', '(', ')',
                         '+', '*', '_', '/', '<', '>', '+', '@', '[', ']', '^', '_', '{', '}', 
                         '|', '~', '0','1','2','3','4','5','6','7','8','9'];
    
    for(let i = 0; i < specialChar.length; i++){
      if(value.includes(specialChar[i])){
        return false;
      }
    }
    return true;
  }

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

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Nome</div>
              <input
                ref={register({
                  required: 'Insira seu nome',
                  minLength: {
                    value: 10,
                    message: 'Seu nome deve ter pelo menos 10 caracteres',
                  },
                  validate: (value) => validaNome(value) || 'Seu nome não pode conter caracteres especiais e números'
                })}
                defaultValue={usuario.nome}
                name="nome"
                type="text"
                className={`form-input ${errors["nome"] ? "border-red-500" : ""
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
                defaultValue={usuario.cpf}
                name="cpf"
                type="text"
                className={`form-input ${errors["cpf"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira seu CPF"
              />
              {errors["cpf"] && (
                <div className="form-error">{errors["cpf"].message}</div>
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
                defaultValue={usuario.matricula}
                name="matricula"
                type="text"
                className={`form-input ${errors["matricula"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira sua Matricula"
              />
              {errors["matricula"] && (
                <div className="form-error">{errors["matricula"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Cursos</div>
              <select
                ref={register({
                  required: 'Selecione um curso',
                })}
                name="curso"
                className={` w-full form-select ${errors["curso"] ? "border border-red-500" : ""
                  }`}
                defaultValue={
                  cursos.find(curso => curso.sigla == usuario.sigla_curso).sigla
                }
              >
                {cursos.map((option, i) => (
                  <option key={i} value={option.sigla}>
                    {option.sigla + ' - ' + option.nome}
                  </option>
                ))}
              </select>
              {errors["curso"] && (
                <div className="form-error">{errors["curso"].message}</div>
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
};

export default Conta;
