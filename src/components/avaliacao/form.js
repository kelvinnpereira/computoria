import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCsrf } from "../../hooks/auth";

const Form = ({ message = null, setAction }) => {
  const [csrf, setCsrf] = useCsrf(null);
  const { handleSubmit, errors, register } = useForm();

  useEffect(() => {
    setCsrf();
  });

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
          onSubmit={handleSubmit((data) => { setAction() })}
          className="form flex flex-wrap w-full">
          <div className="w-full">
            <div className="form-label text-white">Avalie o andamento da aula:</div>

            <div className="form-element flex">
              <div className="mr-6">
                <input type="radio" id="nota-1" name="nota" value="1"></input>
                <label className="form-label text-white ml-3" for="nota-1">Muito ruim</label>
              </div>

              <div className="mr-6">
                <input type="radio" id="nota-2" name="nota" value="2"></input>
                <label className="form-label text-white ml-3" for="nota-2">Ruim</label>
              </div>

              <div className="mr-6">
                <input type="radio" id="nota-3" name="nota" value="3"></input>
                <label className="form-label text-white ml-3" for="nota-3">Ok</label>
              </div>

              <div className="mr-6">
                <input type="radio" id="nota-4" name="nota" value="4"></input>
                <label className="form-label text-white ml-3" for="nota-4">Boa</label>
              </div>

              <div className="mr-6">
                <input type="radio" id="nota-5" name="nota" value="5"></input>
                <label className="form-label text-white ml-3" for="nota-5">Muito boa</label>
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
              className="w-1/2 btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon">
              <p>Avaliar</p>
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Form;