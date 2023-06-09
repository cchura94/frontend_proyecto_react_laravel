import api from "./api";

const productoService = {

    listar: (nroPage=1, limit=10) => {
        return api.get(`/producto?page=${nroPage}&limit=${limit}`);
    },
    guardar: (datos) => {
        return api.post("/producto", datos);
    },
    mostrar: (id) => {
        return api.get(`/producto/${id}`);
    },
    modificar: (id, datos) => {
        return api.put(`/producto/${id}`, datos);
    },
    eliminar: (id) => {
        return api.delete(`/producto/${id}`);
    },
}

export default productoService;