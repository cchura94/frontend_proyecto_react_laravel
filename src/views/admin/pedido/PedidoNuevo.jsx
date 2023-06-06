import { useEffect, useState } from "react"
import productoService from "../../../services/productoService"
import TablePagination from "../../../components/TablePagination"
import clienteService from "../../../services/clienteService"

const PedidoNuevo = () => {

    const [productos, setProductos] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [carrito, setCarrito] = useState([])

    const [buscar, setBuscar] = useState('')
    const [clientes, setClientes] = useState([])

    const columnas = [
        // { key: "id", label: "ID" },
        { key: "nombre", label: "NOMBRE" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "C" },
        { key: "categoria.nombre", label: "CATEGORIA" }
    ]

    useEffect(() => {
        listarProductos()
    }, [])

    const listarProductos = async (nroPage = 1, limite = 5) => {
        try {
            setPage(nroPage)
            const datos = await productoService.listar(nroPage, limite)
            setProductos(datos.data.data)
            setTotal(datos.data.total)
        } catch (error) {

        }
    }

    const addCarrito = (prod) => {
        console.log(prod)
        
        let obj = {producto_id: prod.id, cantidad: 1, precio: prod.precio, nombre: prod.nombre}
        setCarrito([...carrito, obj])
    }

    const buscarCliente = async (e) => {
        if(e.key == 'Enter'){
            setBuscar(e.target.value)
            const {data} = await clienteService.listar(1, 5, buscar)
            setClientes(data.data)
        }
    }


    return (
        <div className="col-span-full xl:col-span-12 md:col-span-12 shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Nuevo Pedido</h2>
            </header>
            <div className="p-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="bg-white p-4 rounded shadow">
                            <h1>Lista de Productos</h1>
                            <div className="overflow-x-auto">

                                <TablePagination columnas={columnas} datos={productos} page={page} total={total} paginate={listarProductos} handleAddCarrito={addCarrito} ></TablePagination>
                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-1 grid grid-rows-3 gap-4">
                        <div className="bg-white p-4 rounded shadow">
                            <h1>Carrito</h1>
                            <table className='table-auto w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>NOM</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>C.</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>PRECIO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {carrito.map((prod => (
                                        <tr>
                                            <td className='px-6 py-3'>{prod.nombre}</td>
                                            <td className='px-6 py-3'>{prod.cantidad}</td>
                                            <td className='px-6 py-3'>{prod.precio}</td>
                                            <td className='px-6 py-3'></td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h1>Cliente</h1>
                            <input type="text" onKeyUp={(e) => buscarCliente(e)} onKeyDown={(e) => buscarCliente(e)} />
                            <table className='table-auto w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>NOM</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>C.</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>PRECIO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {clientes.map((clie => (
                                        <tr>
                                            <td className='px-6 py-3'>{clie.nombre_completo}</td>
                                            <td className='px-6 py-3'>{clie.ci_nit}</td>
                                            <td className='px-6 py-3'>{clie.telefono}</td>
                                            <td className='px-6 py-3'> <button>+</button></td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h1>Pedido</h1>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={() => navigate(`/admin/pedido`)}>Guardar Pedido</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PedidoNuevo;