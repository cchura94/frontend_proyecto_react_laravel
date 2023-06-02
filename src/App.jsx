import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'

// import './App.css'

import Routes from './routes'

import './layouts/css/style.css';

import './layouts/charts/ChartjsConfig';
import Prueba from './views/admin/Prueba'
import { UserContextProvider } from './context/UserContext';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      
      <UserContextProvider>

        <Routes />

      </UserContextProvider>



      {
        /*
        <Routes>
        <Route path='/' element={<Inicio />}></Route> 
        <Route path="/login" element={<Login />}></Route> 
        <Route path='/registro' element={<Registro />}></Route> 

        <Route path='/categoria/:slug' element={<InicioCategoria />}></Route>
        <Route path='/admin/categoria' element={<Categoria />}></Route>

        <Route path='/admin' element={<Prueba />}></Route>
        
        <Route path='*' element={<h2>Pagina NO ENCONTRADA 404</h2>}></Route>        
      </Routes> 
      */
      }
    </>
  )
}

export default App
