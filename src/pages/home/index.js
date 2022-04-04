import Router from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  useEffect(() => {
    if (Cookies.get('cargo') === 'usuario') {
      Router.push('/home/usuario');
    } else {
      Router.push('/home/coordenador');
    }
  })
  return (<></>)
}

export default Home;
