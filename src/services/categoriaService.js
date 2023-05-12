import api from "./api";

const categoriaService = {

    listar: () => {
        return api.get("/categoria");
    },
    guardar: (datos) => {
        return api.post("/categoria", datos);
    },
    mostrar: (id) => {
        return api.get(`/categoria/${id}`);
    },
    modificar: (id, datos) => {
        return api.put(`/categoria/${id}`, datos);
    },
    eliminar: (id) => {
        return api.delete(`/categoria/${id}`);
    },
}

export default categoriaService;