import { useEffect, useState } from "react";
import productoService from "./../../../services/productoService"

const Producto = () => {
    // estado o variables +hooks
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)
    // para paginacion
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        listar()
    }, [])

    // funciones
    const listar = async (nroPage) => {
        try {
            setPage(nroPage)
            const datos = await productoService.listar(nroPage, itemsPerPage)
            setProductos(datos.data.data)
            setTotal(datos.data.total)
        } catch (error) {
            
        }
    }

    // calculo de indices de paginación
    const indiceUltimoItem = page * itemsPerPage
    const indicePrimerItem = indiceUltimoItem - itemsPerPage
    // const productosActuales = productos.slice(indicePrimerItem, indiceUltimoItem)

    // para cambiar página
    const paginate = (nroPagina) => { 
        listar(nroPagina)
        
    }


    return (
        <div className="col-span-full xl:col-span-12 md:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Lista Productos</h2>
            </header>
            <div className="p-3">
                { page }
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">NOMBRE</th>
                            <th className="py-3 px-6 text-left">PRECIO</th>
                            <th className="py-3 px-6 text-left">CANTIDAD</th>
                            <th className="py-3 px-6 text-left">CATEGORIA</th>
                            <th className="py-3 px-6 text-left">IMG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="py-4 px-6">{ producto.id }</td>
                                <td>{ producto.nombre }</td>
                                <td>{ producto.precio }</td>
                                <td>{ producto.stock }</td>
                                <td>{ producto.categoria.nombre }</td>
                                <td>{ producto.imagen }</td>
                            </tr>                        

                        ))}
                    </tbody>

                </table>

                <div className="flex justify-center mt-4">
                    <nav className="inline-flex rounded-md shadow">
                        <button
                            className="py-2 px-4 bg-gray-200 text-gray-500 rounded-l-md hover:bg-gray-300"
                            onClick={() => paginate(page - 1)}
                            disabled={page == 1}
                        >
                            anterior
                        </button>

                        {total > itemsPerPage && (
                            <div className="flex">
                                {Array.from({length: Math.ceil(total / itemsPerPage)}).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={ `${page=== index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}  py-2 px-4 mx-1 rounded-md focus:outline-none` }
                                    >
                                        {index + 1}
                                    </button>

                                ))}

                            </div>
                        )}


                        <button
                            className="py-2 px-4 bg-gray-200 text-gray-500 rounded-r-md hover:bg-gray-300"
                            onClick={() => paginate(page + 1)}
                            disabled={page == Math.ceil(total / itemsPerPage)}
                                >
                            siguiente
                        </button>
                    </nav>

                </div>
                { /* JSON.stringify(productos) */}
            </div>
        </div>
    );
}

export default Producto;