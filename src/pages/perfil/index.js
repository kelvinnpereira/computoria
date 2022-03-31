import React from "react";
import Router from "next/router";
import Cookies from 'js-cookie';

export default function Index () {
  React.useEffect(() => {
    Router.push("/perfil/" + Cookies.get('user'));
  });

  return <div/>;
}
