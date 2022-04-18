import Alert from "../alerts";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import Datepicker from '../d-board/datepicker';
import Timepicker from '../d-board/timepicker';
import moment from "moment";

const Form = ({ message = null, setSubmit, isLoading, tutor, especialidades, diasUteis, agenda }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register, watch } = useForm();

  React.useEffect(() => {
    setCsrf();
  });

  const isBusinessDay = (date) => {
    if (moment(date, "DD-MM-YYYY").toDate() <= new Date()) return false;
    const day = moment(date, "DD-MM-YYYY").day();
    for (const item of diasUteis) {
      if (item.dia === day) {
        return true;
      }
    }
    return false;
  }

  const isBusinessHourStart = (hora) => {
    for (const item of diasUteis) {
      if (hora >= item.hora_inicio) {
        return true;
      }
    }
    return false;
  }

  const isBusinessHourEnd = (hora) => {
    for (const item of diasUteis) {
      if (hora > document.getElementsByName('hora_inicio')[0].value && hora <= item.hora_fim) {
        return true;
      }
    }
    return false;
  }

  const availableHourStart = (hora) => {
    for (const item of agenda) {
      if (item.status === 'solicitada' || item.status === 'agendada') {
        const start = new Date(item.data_inicio).toLocaleTimeString().slice(0, -3);
        const end = new Date(item.data_fim).toLocaleTimeString().slice(0, -3);
        const day = moment(document.getElementsByName('dia')[0].value, "DD-MM-YYYY").date();
        const item_day = new Date(item.data_inicio).getDate();
        if (item_day === day && (hora >= start && hora <= end)) {
          return false;
        }
      }
    }
    return true;
  }

  const availableHourEnd = (hora) => {
    for (const item of agenda) {
      if (item.status === 'solicitada' || item.status === 'agendada') {
        const start = new Date(item.data_inicio).toLocaleTimeString().slice(0, -3);
        const end = new Date(item.data_fim).toLocaleTimeString().slice(0, -3);
        const day = moment(document.getElementsByName('dia')[0].value, "DD-MM-YYYY").date();
        const item_day = new Date(item.data_inicio).getDate();
        const hora_inicio = document.getElementsByName('hora_inicio')[0].value;
        if (item_day === day && (hora_inicio < start && hora >= start) ) {
          return false;
        }
      }
    }
    return true;
  }

  const valid_hour = (current) => {
    if (current <= new Date().toLocaleTimeString().slice(0, -3)) return false;
    return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(current);
  }

  return (
    <>
      <div className="flex flex-col" style={{ width: "550px" }}>
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
            setSubmit({
              ...data,
              tutor: tutor.matricula
            });
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Nome do Tutor/Monitor</div>
              <input
                name="nome"
                type="text"
                className={`form-input ${errors["nome"] ? "border-red-500" : ""
                  }`}
                defaultValue={tutor.nome}
                readOnly
              />
            </div>

            <div className="form-element" key="container-1">
              <div className="form-label text-white">Matricula do Tutor/Monitor</div>
              <input
                name="matricula"
                type="text"
                className={`form-input ${errors["matricula"] ? "border-red-500" : ""
                  }`}
                defaultValue={tutor.matricula}
                readOnly
              />
            </div>

            <div className="form-element" key="container-2">
              <div className="form-label text-white">Disciplinas</div>
              <select
                ref={register({
                  required: 'Selecione uma Disciplina',
                })}
                name="disciplina"
                className={` w-full form-select ${errors["disciplina"] ? "border border-red-500" : ""
                  }`}
              >
                <option disabled selected value>
                  -- Selecione uma Disciplina --
                </option>
                {especialidades.map((option, i) => (
                  <option key={i} value={option.sigla}>
                    {option.sigla + ' - ' + option.nome}
                  </option>
                ))}
              </select>
              {errors["disciplina"] && (
                <div className="form-error">{errors["disciplina"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-3">
              <Datepicker
                label={'Dia'}
                register={register}
                register_obj={{
                  required: 'Selecione uma data',
                  validate: (value) => isBusinessDay(value) || 'Dia não disponivel para agendamento'
                }}
                name='dia'
              />
              {errors["dia"] && (
                <div className="form-error">{errors["dia"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-4">
              <Timepicker
                label={'Hora inicio'}
                register={register}
                register_obj={{
                  required: 'Selecione o horario de inicio',
                  validate: (value) => (valid_hour(value) && isBusinessHourStart(value) && availableHourStart(value)) || 'Horario de inicio invalido'
                }}
                name='hora_inicio'
              />
              {errors["hora_inicio"] && (
                <div className="form-error">{errors["hora_inicio"].message}</div>
              )}
            </div>

            <div className="form-element" key="container-5">
              <Timepicker
                label={'Hora fim'}
                register={register}
                register_obj={{
                  required: 'Selecione o horario de inicio',
                  validate: (value) => (valid_hour(value) && isBusinessHourEnd(value) && availableHourEnd(value)) || 'Horario de fim invalido'
                }}
                name='hora_fim'
              />
              {errors["hora_fim"] && (
                <div className="form-error">{errors["hora_fim"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2" />
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
