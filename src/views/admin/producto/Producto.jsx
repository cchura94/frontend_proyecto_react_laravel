import { useEffect, useState } from "react";
import productoService from "./../../../services/productoService"
import TablePagination from "../../../components/TablePagination";
import Modal from "../../../components/Modal";
import categoriaService from "../../../services/categoriaService";
import Swal from 'sweetalert2'

const Producto = () => {
    // estado o variables +hooks
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)
    // para paginacion
    const [page, setPage] = useState(1)

    // para modal
    const [modalOpen, setModalOpen] = useState(false)
    const [producto, setProducto] = useState({nombre: "", precio: 0, stock: 0, categoria_id: "", descripcion: ""})
    const [categorias, setCategorias] = useState([])
    const [imagen, setImagen] = useState(null)

    const columnas = [
        { key: "id", label: "ID" },
        { key: "nombre", label: "NOMBRE" },
        { key: "precio", label: "PRECIO" },
        { key: "stock", label: "CANTIDAD" },
        { key: "categoria.nombre", label: "CATEGORIA" }
    ]
    useEffect(() => {
        listar()
        listaCategorias()
        
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProducto((prevState => ({
            ...prevState,
            [name]: value
        })))
    }
    
    const funGuardar = async (e) => {
        e.preventDefault()

        if(producto.id){
            const res = await productoService.modificar(producto.id, producto)
        }else{

            const res = await productoService.guardar(producto)
        }


        listar()
        resetData()

        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro Correcto',
            showConfirmButton: false,
            timer: 1500
          })

    }

    // funciones
    const listar = async (nroPage = 1, limite = 5) => {
        try {
            setPage(nroPage)
            const datos = await productoService.listar(nroPage, limite)
            setProductos(datos.data.data)
            setTotal(datos.data.total)
        } catch (error) {

        }
    }

    const listaCategorias = async () => {
        try {
            const datos = await categoriaService.listar()
            setCategorias(datos.data)
        } catch (error) {

        }
    }

    const resetData = () => {
        setProducto({nombre: "", precio: 0, stock: 0, categoria_id: "", descripcion: ""})
        setModalOpen(false)
    }

    const editarModal = (datos) => {
        setProducto(datos)
        setModalOpen(true)
    }

    const eliminarProducto = async (datos) => {
        if(confirm("¿Esta seguro de eliminar el Producto?")){
            await productoService.eliminar(datos.id)

            listar()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto eliminado',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    const handleChageImagen = (event) => {
        const file = event.target.files[0];

        setImagen(file);
        console.log(file)


    }

    const handleUpload = () => {

    }


    return (
        <div className="col-span-full xl:col-span-12 md:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Lista Productos</h2>
            </header>
            <div className="p-3">

                <button className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2' onClick={() => setModalOpen(true)}>Nuevo Producto</button>



                <TablePagination columnas={columnas} datos={productos} page={page} total={total} paginate={listar} handleEdit={editarModal} handleDelete={eliminarProducto}></TablePagination>

                <Modal modalOpen={modalOpen} setModalOpen={resetData}>
                    {/* JSON.stringify(producto) */}
                    <form onSubmit={(e) => { funGuardar(e) }}>
                        <label className='mb-2 block'>Ingrese Nombre</label>
                        <input
                            type="text"
                            name='nombre'
                            value={producto.nombre}
                            onChange={handleChange}
                            className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                        />
                        <label className='mb-2 block'>Precio</label>
                        <input
                            type="number"
                            step="0.01"
                            name='precio'
                            value={producto.precio}
                            onChange={handleChange}
                            className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                        />

                        <label className='mb-2 block'>Cantidad</label>
                        <input
                            type="number"
                            name='stock'
                            value={producto.stock}
                            onChange={handleChange}
                            className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'
                        />

                        <label className='mb-2 block'>Categoria</label>
                        <select name="categoria_id" onChange={handleChange} required  className='border border-gray-300 rounded px-2 py-1 mb-2 w-full'>
                            <option value="-1">Seleccione una Opcion</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id} selected={categoria.id==producto.categoria_id?true:false}>{ categoria.nombre }</option>
                            ))}
                        </select>

                        <label className='mb-2 block'>Ingrese Descripción</label>
                        <input type="text" name='descripcion' value={producto.descripcion} onChange={handleChange} className='border border-gray-300 rounded px-2 py-1 mb-2 w-full' />
                        <input type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2' />
                    </form>

                    <input type="file" accept="image/*" onChange={handleChageImagen} />
                    <button type="button" onClick={handleUpload}>Actualizar Imagen</button>

                </Modal>
            </div>
        </div>
    );
}

export default Producto;