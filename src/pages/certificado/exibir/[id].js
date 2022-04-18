import { get } from '../../../lib/api';

const Certificado = ({ usuario, cursos, certificado }) => {
    const nome = usuario.nome;
    const matricula = usuario.matricula;
    const curso = cursos.find(curso => curso.sigla == usuario.sigla_curso);
    return (
        <>
            <div className="cabecalho">
                <img src="https://numeros.icomp.ufam.edu.br/numeros_assets/img/icomp.png" alt="Logo Icomp" width="200"
                    height="auto" className="cabecalho-logo" />
                <span className="cabecalho-endereco">Av. Gen. Rodrigo Octávio, 6200 </span>
                <span className="cabecalho-endereco">Setor Norte do Campus Universitário</span>
                <span className="cabecalho-endereco">Coroado, Manaus - AM, 69080-900</span>
                <h1 className="cabecalho-titulo" >CERTIFICADO</h1>
            </div>
            <div className="texto">
                <p>
                    A equipe <b>COMPUTORIA</b>, certifica que <b>{nome}</b>, do curso <b>{curso.nome}</b>,
                    matrícula {matricula}, utilizou os serviços de nossa plataforma para realizar atividades de monitoria_aceitar
                    e obteve boas avaliações dos usuários
                    auxiliados, com <b>carga horário total de 30 horas</b>.
                </p>
            </div>

            <div className="assinaturas">
                <div className="coordenador">
                    <p><b>Coordenador</b></p>
                    <p>André Carvalho</p>
                </div>
                <div className="computoria">
                    <p><b>Computoria</b></p>
                    <p>#ÉOKELVINN</p>
                </div>
            </div>
            <div className='ml-6'>Id de certificado: {certificado.id}</div>

        </>
    )
}

export default Certificado;

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const response = await get('/api/usuario', { headers: req.headers });
    const response2 = await get('/api/cursos');
    const response3 = await get(`/api/certificado/${context.params.id}`, { headers: req.headers })
    return {
        props: {
            usuario: response.data.usuario,
            cursos: response2.data.cursos,
            certificado: response3.data.certificado,
        },
    }
}