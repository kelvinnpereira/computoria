import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Computoria" subtitle="Home" />
      <Widget>
      </Widget>
    </>
  );
};

export default Home;
