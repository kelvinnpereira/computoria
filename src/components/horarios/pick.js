import Alert from "../alerts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import Timepicker from '../d-board/timepicker/index';

const Horarios = ({ message = null, setAction, isLoading, horarios }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { handleSubmit, errors, register } = useForm();

  let horarios_array = [[], [], [], [], [], [], []];
  let dias = ['Domingo', 'Segunda', 'Terça', "Quarta", 'Quinta', 'Sexta', 'Sábado',];
  let chaves = ['domingo', 'segunda', 'terca', "quarta", 'quinta', 'sexta', 'sabado',];
  horarios.forEach((item) => {
    horarios_array[item.dia].push(item);
  })

  useEffect(() => {
    setCsrf();
  });

  const valid_hour = (current) => {
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(current);
  }

  return (
    <div className="flex flex-col w-full">
      {(message || errorMsg) && (
        <div className="w-full mb-4">
          <Alert
            color="bg-transparent border-red-500 text-red-500"
            borderLeft
            raised>
            {message}
            {errorMsg}
          </Alert>
        </div>
      )}
      <form
        onSubmit={handleSubmit((data) => {
          setErrorMsg(null);
          setAction(data);
        })}
        className="form flex flex-wrap w-full">
        <div className="w-full items-center">
          <table className="table border-separate border-slate-500">
            <thead>
              <tr>
                {horarios_array.map((item, i) => {
                  return (
                    <th className='border border-slate-600'>
                      <label key={`checkbox-${i + 1}`}
                        className="flex justify-between space-x-2">
                        <span className={`${errors[chaves[i]] ? "text-red-500" : ""}`}>
                          {dias[i]}
                        </span>
                        <input
                          id={chaves[i]}
                          ref={register({
                            required: true
                          })}
                          type="checkbox"
                          value={i}
                          name="dias"
                          className={`form-checkbox h-4 w-4 ${errors[chaves[i]] ? "text-red-500" : ""}`}
                          defaultChecked={item.length !== 0}
                        />
                      </label>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  horarios_array.map((horarios, i) => {
                    return horarios.length === 0
                      ?
                      (
                        <td className='border border-slate-700'>
                          <div className="form-label text-white">Horario 1</div>
                          <div className='widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>

                            <Timepicker
                              label={'Inicio'}
                              register={register}
                              register_obj={{
                                required: false,
                                validate: (value) => valid_hour(value) || 'Horario invalido'
                              }}
                              name={`horarios[${i}][0][inicio]`}
                            />

                            <Timepicker
                              label={'Fim'}
                              register={register}
                              register_obj={{
                                required: false,
                                validate: (value) => {
                                  const checked = document.getElementById(chaves[i]).checked;
                                  const inicio = document.getElementsByName(`horarios[${i}][0][inicio]`)[0].value;
                                  const fim = value;
                                  const valid = (!checked || (valid_hour(fim) && inicio < fim));
                                  const msg = 'Horario invalido em ' + dias[i];
                                  if (!valid) setErrorMsg(msg);
                                  return valid || msg;
                                }
                              }}
                              name={`horarios[${i}][0][fim]`}
                            />

                          </div>
                        </td>
                      )
                      :
                      <td className='border border-slate-700'>
                        {horarios.map((hora, j) => {
                          return (
                            <>
                              <div className="form-label text-white">{`Horario ${j + 1}`}</div>
                              <div className='widget p-4 mb-4 rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800'>

                                <Timepicker
                                  label={'Inicio'}
                                  register={register}
                                  register_obj={{
                                    required: false,
                                    validate: (value) => valid_hour(value) || 'Horario invalido'
                                  }}
                                  name={`horarios[${i}][${j}][inicio]`}
                                  initialValue={hora.hora_inicio}
                                />

                                <Timepicker
                                  label={'Fim'}
                                  register={register}
                                  register_obj={{
                                    required: false,
                                    validate: (value) => {
                                      const checked = document.getElementById(chaves[i]).checked;
                                      const inicio = document.getElementsByName(`horarios[${i}][${j}][inicio]`)[0].value;
                                      const fim = value;
                                      const valid = (!checked || (valid_hour(fim) && inicio < fim));
                                      const msg = 'Horario invalido em ' + dias[i];
                                      if (!valid) setErrorMsg(msg);
                                      return valid || msg;
                                    }
                                  }}
                                  name={`horarios[${i}][${j}][fim]`}
                                  initialValue={hora.hora_fim}
                                />

                              </div>
                            </>
                          )
                        })}
                      </td>
                  })
                }
              </tr>
            </tbody>
          </table>

          <input type="hidden" name="_csrf" value={`${csrf}`}></input>

          <div class="flex mt-3">
            <div class="w-1/3"></div>
            <div class="w-1/3 ">
              <button
                className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
                {isLoading
                  ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                  : null}
                <p>Atualizar</p>
              </button>
            </div>
            <div class="w-1/3"></div>
          </div>

        </div>
      </form>
    </div>
  )
}

export default Horarios;
