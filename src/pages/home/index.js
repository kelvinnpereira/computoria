import ContentLoader from "react-content-loader";
import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import Widget from "../../components/widget";
import Kanban from "../../components/kanban";

const LoadView = () => (
  <ContentLoader viewBox="0 0 380 200">
    <rect x="10" y="0" width="80" height="20"/>
    <rect x="100" y="0" width="80" height="20"/>
    <rect x="190" y="0" width="80" height="20"/>
    <rect x="280" y="0" width="80" height="20"/>

    <rect x="10" y="30" width="80" height="20"/>
    <rect x="100" y="30" width="80" height="20"/>
    <rect x="190" y="30" width="80" height="20"/>

    <rect x="100" y="60" width="80" height="20"/>

    <rect x="100" y="90" width="80" height="20"/>
  </ContentLoader>
);
const Index = () => {
  const actions = (
    <>
      <button
        className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded btn-icon"
      >
        Refresh
      </button>
    </>
  );

  const data = [];

  return (
    <>
      <Head>
        <title>
          Computoria: Home
        </title>
      </Head>
      <SectionTitle title="Task" subtitle="Kanban" actions={actions}/>
      <Widget>
          <Kanban/>
      </Widget>
    </>
  );
};
export default Index;
