import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";
import { get } from "../../../lib/api";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Computoria: Home Coordenador
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home Coordenador" />
      <Widget>
      </Widget>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  
  return {
    props: {
      
    }
  }
}
