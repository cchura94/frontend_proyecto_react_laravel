import React from 'react';
import categoriaService from './../../services/categoriaService';

const Categoria = () => {
    // estados o variables
    const [titulo, setTitulo] = React.useState('Gestion Categorias')
    const [categorias, setCategorias] = React.useState([])
    const [nombre, setNombre] = React.useState('')
    const [detalle, setDetalle] = React.useState('')
    // objeto categoria
    const [categoria, setCategoria] = React.useState({
        "nombre": "",
        "detalle": ""
    })
    // para modal
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const abrirModal = () => {
        setIsModalOpen(true);
    }

    const cerrarModal = () => {
        setCategoria({
            "nombre": "",
            "detalle": ""
        })
        setIsModalOpen(false);
    }

    const abrirModalEditar = (categoria) => {

        setNombre(categoria.nombre);
        setDetalle(categoria.detalle);

        setCategoria(categoria)
        abrirModal(true)
    }

    React.useEffect(() => {
        
        listarCategorias()

    }, [])


    // funciones de 
    
    async function listarCategorias() {
        const { data } = await categoriaService.listar()
        setCategorias(data)
    }

    const funGuardarCategoria = async (e) => {
        e.preventDefault()

        if(categoria.id){
            const datos = await categoriaService.modificar(categoria.id, categoria)

        }else{
            const res = await categoriaService.guardar(categoria)
            console.log(res.data)

        }
        
        cerrarModal()
        listarCategorias()
    }

    const handleChangeCategoria = (e) => {
        const { name, value } = e.target;

        setCategoria((prevState => ({
            ...prevState,
            [name]: value
        })))
    }

    const eliminarCategoria = async (categoria) => {
        if(confirm("¿Esta seguro de eliminar la categoria?")) {
            const el = await categoriaService.eliminar(categoria.id);
            
            listarCategorias()
        }

    }


    return (
        <>
            <div className="col-span-full xl:col-span-12 md:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-800">Gestión Categorias</h2>
                </header>
                <div className="p-3">

                    <div className="overflow-x-auto">

                        <h1>{titulo}</h1>


                        <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={abrirModal}>Nueva Categoria</button>

                        <table className='table-auto w-full'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>ID</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>NOMBRE</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>DETALLE</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>GESTION</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {categorias.map((categoria) => (
                                    <tr key={categoria.id}>
                                        <td className='px-6 py-3 whitespace-nowrap'>{categoria.id}</td>
                                        <td>{categoria.nombre}</td>
                                        <td>{categoria.detalle}</td>
                                        <td>
                                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={() => abrirModalEditar(categoria)}>editar</button>
                                            <button className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mr-2' onClick={() => eliminarCategoria(categoria)}>eliminar</button>
                                        </td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='fixed inset-0 bg-black opacity-50'></div>
                    <div className='bg-white rounded-lg p-6 w-2/3 md:w-1/2 xl:w-1/3 relative'>
                        <h2 className='text-lg font-bold mb-4'>Categoria</h2>

                        { /* JSON.stringify(categoria) */}
                        <form onSubmit={(e) => { funGuardarCategoria(e) }}>
                            <label className='mb-2 block'>Ingrese Nombre</label>
                            <input
                                type="text"
                                name='nombre'
                                value={categoria.nombre}
                                onChange={handleChangeCategoria}
                                className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                            />

                            <label className='mb-2 block'>Ingrese Detalle</label>
                            <input type="text" name='detalle' value={categoria.detalle} onChange={handleChangeCategoria} className='border border-gray-300 rounded px-2 py-1 mb-2 w-full' />
                            <input type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2' />
                        </form>

                        <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-4 py-2 mt-4 absolute top-0 right-0 mr-4 mt-4' onClick={cerrarModal}>
                            X
                        </button>

                    </div>

                </div>

            )}

        </>
    );
}

export default Categoria;