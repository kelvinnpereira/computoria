import React, { useState } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";

const Form = ({ message = null, setLogin, isLoading }) => {
  const [data, onSubmit] = useState(null);
  let items = [
    {
      label: "CPF ou E-mail",
      error: { required: "Insira seu CPF ou E-mail" },
      name: "username",
      type: "text",
      placeholder: "Insira seu CPF ou E-mail"
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
        <Validation items={items} isLoading={isLoading} onSubmit={(e) => {
          onSubmit(e);
          setLogin(e);
        }}/>
      </div>
    </>
  );
};

export default Form;
