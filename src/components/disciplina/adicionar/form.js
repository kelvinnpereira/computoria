import Alert from "../../alerts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../../hooks/auth";
import { get } from '../../../lib/api';

const Form = ({ message = null, setAction, isLoading, cursos }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register, watch } = useForm();
  const [disciplinas, setDisciplinas] = useState([]);

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

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Cursos</div>
              <select
                ref={register({
                  required: 'Selecione um curso',
                })}
                name="curso"
                className={` w-full form-select ${errors["curso"] ? "border border-red-500" : ""
                  }`}
                onChange={async (event) => {
                  let response = await get('/disciplinas/' + event.target.value);
                  if (response?.data?.disciplinas) {
                    setDisciplinas(response.data.disciplinas);
                  }
                }}
              >
                <option disabled selected value>
                  -- Selecione um curso --
                </option>
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


            <div className="form-element" key="container-1">
              <div className="form-label">Disciplinas</div>
              <div className="block">
                {disciplinas.map((option, j) => (
                  <label key={`checkbox-${j}`}
                    className="flex items-center justify-start space-x-2">
                    <input
                      ref={register({
                        required: true
                      })}
                      type="checkbox"
                      value={`${option.sigla}`}
                      name="disciplinas"
                      className={`form-checkbox h-4 w-4 ${errors['disciplinas'] ? "text-red-500" : ""
                        }`}
                    />
                    <span
                      className={`${errors['disciplinas'] ? "text-red-500" : ""
                        }`}>
                      {`${option.sigla} - ${option.nome}`}
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
      </div>
    </>
  );
};

export default Form;
