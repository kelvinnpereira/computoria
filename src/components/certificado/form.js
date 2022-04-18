const SolicitarCertificado = ({ solicitacao, matricula }) => {

    const buttonSolicitar = (event) => {
        solicitacao({ matricula: event.target.dataset.matricula });
    }

    return (
        <button
            data-matricula={matricula}
            className="w-1/2 btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon"
            onClick={buttonSolicitar}>
            Solicitar
        </button>
    )
};

export default SolicitarCertificado;
