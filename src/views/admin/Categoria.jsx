import React from 'react';
import categoriaService from './../../services/categoriaService';

const Categoria = () => {
    // estados o variables
    const [titulo, setTitulo] = React.useState('Gestion Categorias')
    const [categorias, setCategorias] = React.useState([])

    React.useEffect(() => {
        async function listarCategorias(){
            const {data} = await categoriaService.listar()
            setCategorias(data)
        }

        listarCategorias()
    }, [])
    
    // funciones de js


    return (
        <>
        <h1>{titulo}</h1>
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