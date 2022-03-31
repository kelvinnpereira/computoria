import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get, cookieToDict } from '../../lib/api';

const ListarMonitoria = ({ disciplinas }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Monitoria
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Monitoria" />
      <Widget>
        {
          disciplinas?.length == 0
            ?
            <div className="w-full mb-4">
              Você não tem monitorias
            </div>
            :
            <List1 items={disciplinas?.map((item) => {
              return {
                title: item.sigla + " - " + item.nome
              }
            })} />
        }
      </Widget>
    </>
  );
};

export default ListarMonitoria;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookie = cookieToDict(req.headers.cookie);
  const response = await get(`/api/monitoria/listar/${cookie.user}`, {
    headers: req.headers
  });
  return {
    props: { disciplinas: response.data.disciplinas },
  }
}