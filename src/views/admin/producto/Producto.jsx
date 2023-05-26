import { useEffect, useState } from "react";
import productoService from "./../../../services/productoService"
import TablePagination from "../../../components/TablePagination";

const Producto = () => {
    // estado o variables +hooks
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)
    // para paginacion
    const [page, setPage] = useState(1)
    

    const columnas = [
                        {key: "id", label: "ID"}, 
                        {key: "nombre", label: "NOMBRE"},
                        {key: "precio", label: "PRECIO"},
                        {key: "stock", label: "CANTIDAD"},
                        {key: "categoria.nombre", label: "CATEGORIA"},
                        {key: "imagen", label: "IMG"},
                        {key: 'gestion', label: 'GESTION'}
                    ]
    useEffect(() => {
        listar()
    }, [])

    // funciones
    const listar = async (nroPage=1, limite=5) => {
        try {
            setPage(nroPage)
            const datos = await productoService.listar(nroPage, limite)
            setProductos(datos.data.data)
            setTotal(datos.data.total)
        } catch (error) {
            
        }
    }

    return (
        <div className="col-span-full xl:col-span-12 md:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Lista Productos</h2>
            </header>
            <div className="p-3">
                
                <TablePagination columnas={columnas} datos={productos} page={page} total={total} paginate={listar}></TablePagination>

            </div>
        </div>
    );
}

export default Producto;