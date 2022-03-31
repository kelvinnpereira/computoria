import Head from "next/head";

import SectionTitle from "../../../components/section/section-title";
import Widget from "../../../components/widget";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Admin Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Admin Computoria" subtitle="Home" />
      <Widget>
      </Widget>
    </>
  );
};

export default Home;
