import React, { useState } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";

const Form = ({ message = null, setSignup, isLoading , cursos, csrf}) => {
  const [data, onSubmit] = useState(null);
  let items = [
    {
      label: 'Nome',
      error: {
        required: 'Insira seu nome',
        minLength: {
          value: 10,
          message: 'Seu nome deve ter pelo menos 10 caracteres'
        }
      },
      name: 'nome',
      type: 'text',
      placeholder: 'Insira seu nome completo'
    },
    {
      label: "CPF",
      error: { required: "Insira seu CPF" },
      name: "cpf",
      type: "text",
      placeholder: "Insira seu CPF"
    },
    {
      label: "E-mail",
      error: { required: "Insira seu E-mail" },
      name: "email",
      type: "text",
      placeholder: "Insira seu E-mail"
    },
    {
      label: "Curso",
      error: { required: "E-mail" },
      name: "curso",
      type: "select",
      options: cursos.map(
        (curso) => {
          return {
            label: curso.nome,
            name: curso.nome
          }
        }
      )
    },
    {
      label: "Matricula",
      error: {
        required: "Insira sua matricula",
        minLength: {
          value: 8,
          message: "Sua matricula deve ter pelo 8 caracteres"
        }
      },
      name: "Matricula",
      type: "text",
      placeholder: "Insira sua matricula"
    },
    {
      label: "Senha",
      error: {
        required: "Insira sua senha",
        minLength: {
          value: 8,
          message: "Sua senha deve ter pelo menos 8 caracteres"
        }
      },
      name: "password",
      type: "password",
      placeholder: "Insira sua senha"
    },
    {
      label: "Confirme sua Senha",
      error: {
        required: "Confirme sua Senha",
        minLength: {
          value: 8,
          message: "Sua senha deve ter pelo menos 8 caracteres"
        }
      },
      name: "password",
      type: "password",
      placeholder: "Confirme sua Senha"
    }
  ];
  return (
    <>
      <div className="flex flex-col" style={{ width: "250px" }}>
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-red-500 text-red-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} isLoading={isLoading} csrf={csrf} onSubmit={(e) => {
          onSubmit(e);
          setSignup(e);
        }}/>
      </div>
    </>
  );
};

export default Form;
