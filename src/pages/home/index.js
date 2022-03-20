import ContentLoader from "react-content-loader";
import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import Kanban from "../../components/kanban";

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
        <Kanban />
      </Widget>
    </>
  );
};

export default Home;
