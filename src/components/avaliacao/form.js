import Alert from "../alerts";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useCsrf } from "../../hooks/auth";
import { FaRegStar, FaStar } from 'react-icons/fa';

const Form = ({ message = null, setAction, isLoading, ajuda, usuario }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register } = useForm();
  const [avaliacaoMsg, setAvaliacaoMsg] = useState(null);
  const [starsHtml, setStarsHtml] = useState(
    <>
      {[...Array(5)].map((item, i) =>
        <FaRegStar data-type="regstar" className="star inline" id={`star${i + 1}`} size={48} onClick={setStars} />
      )}
    </>
  );

  useEffect(() => {
    setCsrf();
  });

  const nome = () => usuario.matricula === ajuda.matricula_tutor ? ajuda.nome_aluno : ajuda.nome_tutor
  const matricula = () => usuario.matricula === ajuda.matricula_tutor ? ajuda.matricula_aluno : ajuda.matricula_tutor

  function setStars(e) {
    const elem = e.target.tagName === 'svg' ? e.target : e.target.parentElement;
    const target = parseInt(elem.id.replace('star', ''));
    setStarsHtml(
      <>
        {[...Array(5)].map((item, i) => {
          if (target >= i + 1) {
            return <FaStar data-type="fullstar" className="star inline" id={`star${i + 1}`} size={48} onClick={setStars} />;
          } else {
            return <FaRegStar data-type="regstar" className="star inline" id={`star${i + 1}`} size={48} onClick={setStars} />;
          }
        })}
      </>
    )
  }

  const getNota = () => {
    const stars = document.getElementsByClassName('star');
    let nota = 0;
    for (const s of stars) {
      s.dataset.type === 'fullstar' ? nota++ : 0;
    }
    return nota;
  }

  return (
    <>
      <div className="flex flex-col" style={{ width: "550px" }}>
        {(message || avaliacaoMsg) && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-red-500 text-red-500"
              borderLeft
              raised>
              {avaliacaoMsg}
              {message}
            </Alert>
          </div>
        )}
        <form
          onSubmit={handleSubmit((data) => {
            const nota = getNota();
            if (nota >= 1 && nota <= 5) {
              setAction({
                id: ajuda.id,
                nota: nota,
                comentario: document.getElementsByName('comentario')[0]?.value,
              });
            } else {
              setAvaliacaoMsg('Avaliação não selecionada');
            }
          })}
          className="form flex flex-wrap w-full">
          <div className="w-full">

            <div className="form-element" key="container-0">
              <div className="form-label text-white">Nome do Usuario</div>
              <input
                name="nome"
                type="text"
                className={`form-input ${errors["nome"] ? "border-red-500" : ""
                  }`}
                defaultValue={nome()}
                readOnly
              />
            </div>

            <div className="form-element" key="container-1">
              <div className="form-label text-white">Matricula do Usuario</div>
              <input
                name="matricula"
                type="text"
                className={`form-input ${errors["matricula"] ? "border-red-500" : ""
                  }`}
                defaultValue={matricula()}
                readOnly
              />
            </div>

            <div className="form-element flex">

              <div className="form-label text-white">Avalie o andamento da aula:</div>

              <div id="stars">
                {starsHtml}
              </div>

            </div>

            <div className="form-element">
              <div className="form-label text-white">Deixe um comentário:</div>
              <textarea
                defaultValue={''}
                name="comentario"
                className={`form-input ${errors["comentario"] ? "border-red-500" : ""
                  }`}
                placeholder="Insira seu Comentario"
                rows={5}
              ></textarea>
              {errors["comentario"] && (
                <div className="form-error">{errors["comentario"].message}</div>
              )}
            </div>

            <input type="hidden" name="_csrf" value={`${csrf}`}></input>

            <button
              className="w-full btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              {isLoading
                ? <FaSpinner className="spin-spinner stroke-current mr-2" />
                : null}
              <p>Avaliar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Form;