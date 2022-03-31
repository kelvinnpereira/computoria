import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import List1 from "../../components/d-board/lists/list-1";
import { get } from '../../lib/api';

const ListarSolicitacoes = ({ pendencias }) => {
  return (
    <>
      <Head>
        <title>
          Computoria: Listar Solicitacoes
        </title>
      </Head>
      <SectionTitle title="Listar" subtitle="Solicitacoes" />
      <Widget>
        {
          pendencias?.length == 0
            ?
            <div className="w-full mb-4">
              Você não tem solicitações pendentes
            </div>
            :
            <List1 items={pendencias?.map((item) => {
              return {
                title: item.sigla + " - " + item.nome
              }
            })} />
        }
      </Widget>
    </>
  );
};

export default ListarSolicitacoes;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response = await get(`/api/monitoria/solicitacoes/`, {
    headers: req.headers
  });
  return {
    props: { pendencias: response.data.pendencias },
  }
}