import { get } from "../../lib/api";
import List1 from "../../components/d-board/lists/list-1";

import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";

const Listar = ({ certificados }) => {

  return (
    <>
      <Head>
        <title>
          Computoria: Certificados
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Seus Certificados" />
      <Widget>
        {
          certificados.length > 0
            ?
            <List1 items={certificados?.map((item) => {
              return {
                title:
                  <a
                    className='underline decoration-sky'
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/certificado/exibir/${item.id}`}
                  >
                    Certificado id: {item.id}
                  </a>
              }
            })} />
            :
            <p>Você ainda não emitiu certificados.</p>
        }
      </Widget>
    </>
  )
}

export default Listar;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const response1 = await get('/api/certificado/listar', { headers: req.headers });
  return {
    props: { certificados: response1.data.certificados },
  }
}