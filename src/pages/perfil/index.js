import Head from "next/head";

import SectionTitle from "../../components/section/section-title";
import { UnderlinedTabs } from "../../components/tabs";
import Widget from "../../components/widget";

const infConta = () => {
  return (
    <>
      
    </>
  )
}

const infRedes = () => {
  return (
    <></>
  )
}

const Index = () => {

  const tabs = [
    {title: 'Conta', index: 0, content: <infConta/>},
    {title: 'Redes Sociais', index: 1, content: <infRedes/>}
  ]
  return (
    <>
      <Head>
        <title>
          Computoria: Perfil
        </title>
      </Head>
      <SectionTitle subtitle="Perfil" />
      <Widget>
        <div className="flex flex-row m-4">
          <img src='/images/avatar_default.png' alt='Foto usuário' className='rounded-full ring-blue' />
          <div className="pl-4">
            <p className="text-xl font-bold">Nome Usuário</p>
            <p className="text-xs uppercase font-light text-gray-500">Curso</p>
          </div>
        </div>

        <UnderlinedTabs tabs={tabs}/>
      </Widget>
    </>
  );
};

export default Index;
