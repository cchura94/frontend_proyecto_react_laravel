import React from 'react';

import { Outlet } from "react-router-dom"
import Navbar from '../components/Navbar';
import useUser from '../hooks/useUser';
import "./index.css"

const SitioLayouts = () => {
  const { isLogged, logout } = useUser()

  return (
    <div className="leading-normal tracking-normal text-white gradient">
      {
        <div>
        {isLogged ? <button onClick={logout}>SALIR</button> : 'INGRESAR'}
      </div>}


      <Navbar></Navbar>

      <div className="mt-6" >

        <Outlet />
      </div>

    </div>

  );
}

export default SitioLayouts;