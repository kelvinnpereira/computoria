import Head from "next/head";

const Centered = ({ children }) => (
  <>
    <Head>
      <title>Computoria</title>
    </Head>
    <div
      data-layout="centered"
      className="w-full h-screen flex items-center justify-center"
      style={{background: "rgba(17,24,39)"}}>
      {children}
    </div>
  </>
);

export default Centered;
