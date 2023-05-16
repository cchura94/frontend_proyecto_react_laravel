import React from 'react';
import categoriaService from './../../services/categoriaService';

const Categoria = () => {
    // estados o variables
    const [titulo, setTitulo] = React.useState('Gestion Categorias')
    const [categorias, setCategorias] = React.useState([])
    const [nombre, setNombre] = React.useState('')
    const [detalle, setDetalle] = React.useState('')



    React.useEffect(() => {
        async function listarCategorias(){
            const {data} = await categoriaService.listar()
            setCategorias(data)
        }

        listarCategorias()
    }, [])
    
    // funciones de js
    const funGuardarCategoria = async (e) => {
        e.preventDefault()
        console.log(nombre)
        const res = await categoriaService.guardar({nombre, detalle})
        console.log(res.data)

        const {data} = await categoriaService.listar()
            setCategorias(data)
    }



    return (
        <>
        <h1>{titulo}</h1>
        <form onSubmit={(e) => {funGuardarCategoria(e)}}>
            <label>Ingrese Nombre</label>
            <input type="text" onChange={e => setNombre(e.target.value)} />

            <label>Ingrese Detalle</label>
            <input type="text" onChange={e => setDetalle(e.target.value)} />
            <input type="submit" />
        </form>

        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DETALLE</th>
                    <th>GESTION</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{ categoria.id }</td>
                                <td>{ categoria.nombre }</td>
                                <td>{ categoria.detalle }</td>
                                <td><button>editar</button></td>
                            </tr>)
                )}
            </tbody>
        </table>
        </>        
    );
}

export default Categoria;