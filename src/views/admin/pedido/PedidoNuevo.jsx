import { useEffect, useState } from "react"
import productoService from "../../../services/productoService"
import TablePagination from "../../../components/TablePagination"
import clienteService from "../../../services/clienteService"
import pedidoService from "../../../services/pedidoService"
import { useNavigate } from "react-router-dom"
import Modal from "../../../components/Modal"

const PedidoNuevo = () => {

    const [productos, setProductos] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [carrito, setCarrito] = useState([])

    const [buscar, setBuscar] = useState('')
    const [clientes, setClientes] = useState([])
    const [state, setState] = useState({ loading: false, error: false })
    const [cliente, setCliente] = useState({})


    const [modalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate()

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

    const resetData = () => {
        setCliente({ nombre_completo: "", ci_nit: "", telefono: "" })
        setModalOpen(false)
    }

    const listarProductos = async (nroPage = 1, limite = 5) => {
        try {
            setState({ loading: true, error: false })
            setPage(nroPage)
            const datos = await productoService.listar(nroPage, limite)
            setProductos(datos.data.data)
            setTotal(datos.data.total)
            setState({ loading: false, error: false })
        } catch (error) {
            setState({ loading: false, error: true })
        }
    }

    const addCarrito = (prod) => {
        console.log(prod)

        let obj = { producto_id: prod.id, cantidad: 1, precio: prod.precio, nombre: prod.nombre }
        setCarrito([...carrito, obj])
    }

    const buscarCliente = async (e) => {
        if (e.key == 'Enter') {
            setBuscar(e.target.value)
            const { data } = await clienteService.listar(1, 5, buscar)
            setClientes(data.data)
        }
    }

    const seleccionarCliente = (clie) => {
        setCliente(clie)
    }

    const funGuardarCliente = async (e) => {
        e.preventDefault()
        try {
            const {data} = await clienteService.guardar(cliente);
            console.log(data)
            setCliente(data.cliente) 
            setModalOpen(false)

        } catch (error) {
            alert("Error a registrar el cliente")
        }

    }

    const handleChangeCliente = (e) => {
        const { name, value } = e.target;

        setCliente((prevState => ({
            ...prevState,
            [name]: value
        })))
    }


    const guardarPedido = async () => {

        const datos = {
            cliente_id: cliente.id,
            productos: carrito
        }

        try {

            const { data } = await pedidoService.guardar(datos);
            console.log(data)

            navigate("/admin/pedido")
        } catch (error) {
            alert("Error al registrar el pedido")
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
                            <div className="overflow-x-auto">

                                {state.loading &&
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                    </div>
                                }

                                <TablePagination columnas={columnas} datos={productos} page={page} total={total} paginate={listarProductos} handleAddCarrito={addCarrito} ></TablePagination>
                            </div>

                        </div>
                    </div>

                    <div className="md:col-span-1 grid gap-4">
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

                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={() => setModalOpen(true)}>Nuevo Cliente</button>

                            <Modal modalOpen={modalOpen} setModalOpen={resetData}>
                                {/* JSON.stringify(producto) */}
                                <form onSubmit={(e) => { funGuardarCliente(e) }}>
                                    <label className='mb-2 block'>Ingrese Nombre Completo</label>
                                    <input
                                        type="text"
                                        name='nombre_completo'
                                        value={cliente.nombre_completo}
                                        onChange={handleChangeCliente}
                                        className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                                    />
                                    <label className='mb-2 block'>CI/NIT</label>
                                    <input
                                        type="text"
                                        name='ci_nit'
                                        value={cliente.ci_nit}
                                        onChange={handleChangeCliente}
                                        className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                                    />

                                    <label className='mb-2 block'>Telefono</label>
                                    <input
                                        type="text"
                                        name='telefono'
                                        value={cliente.telefono}
                                        onChange={handleChangeCliente}
                                        className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                                    />
                                    <input type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2' value="Guardar Cliente" />
                                </form>

                            </Modal>

                            {cliente.id &&
                                <div>
                                    <h1 className="text-md">{cliente.nombre_completo}</h1>
                                    <h1 className="text-md">{cliente.ci_nit}</h1>
                                    <h1 className="text-md">{cliente.telefono}</h1>
                                </div>
                            }
                            {clientes.length > 0 &&

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
                                                <td className='px-6 py-3'>  <button className="py-2 px-4 bg-green-500 text-white hover:bg-green-600 rounded" onClick={() => seleccionarCliente(clie)}>+</button></td>
                                            </tr>
                                        )))}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h1>Pedido</h1>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={() => guardarPedido()}>Guardar Pedido</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PedidoNuevo;