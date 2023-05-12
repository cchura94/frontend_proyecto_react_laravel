import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Inicio from './views/Inicio'
import Login from './views/Login'
import Registro from './views/Registro'
import Navbar from './components/Navbar'
import InicioCategoria from './views/InicioCategoria'
import Categoria from './views/admin/Categoria'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Inicio />}></Route> 
        <Route path="/login" element={<Login />}></Route> 
        <Route path='/registro' element={<Registro />}></Route> 

        <Route path='/categoria/:slug' element={<InicioCategoria />}></Route>
        <Route path='/admin/categoria' element={<Categoria />}></Route>
        
        <Route path='*' element={<h2>Pagina NO ENCONTRADA 404</h2>}></Route>        
      </Routes> 
    </>
  )
}

export default App
