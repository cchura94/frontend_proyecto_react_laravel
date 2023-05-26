import { useEffect, useState } from "react";
import pedidoService from "./../../../services/pedidoService"
import TablePagination from "../../../components/TablePagination";

const Pedido = () => {

     // estado o variables +hooks
    const [pedidos, setPedidos] = useState([])
    const [total, setTotal] = useState(0)
    // para paginacion
    const [page, setPage] = useState(1)

    const columnas = [
        {key: "id", label: "ID"}, 
        {key: "fecha", label: "FECHA"},
        {key: "estado", label: "ESTADO"},
        {key: "cliente.nombre_completo", label: "CLIENTE"},
        {key: "user.email", label: "Atendido Por"}
    ]

    useEffect(() => {
        listar()
    }, [])

    // funciones
    const listar = async (nroPage=1, limite=5) => {
        try {
            setPage(nroPage)
            const datos = await pedidoService.listar(nroPage, limite)
            setPedidos(datos.data.data)
            setTotal(datos.data.total)
        } catch (error) {
            
        }
    }


    return (
        <div className="col-span-full xl:col-span-12 md:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Lista Pedidos</h2>
            </header>
            <div className="p-3">
                
                <TablePagination columnas={columnas} datos={pedidos} page={page} total={total} paginate={listar}></TablePagination>

            </div>
        </div>        
    );
}

export default Pedido;