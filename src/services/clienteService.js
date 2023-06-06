import api from "./api";

const clienteService = {

    listar: (nroPage=1, limit=10, q='') => {
        return api.get(`/cliente?page=${nroPage}&limit=${limit}&q=${q}`);
    },
    guardar: (datos) => {
        return api.post("/cliente", datos);
    },
    mostrar: (id) => {
        return api.get(`/cliente/${id}`);
    },
    modificar: (id, datos) => {
        return api.put(`/cliente/${id}`, datos);
    },
    eliminar: (id) => {
        return api.delete(`/cliente/${id}`);
    },
}

export default clienteService;