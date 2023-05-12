import api from "./api";

const usuarioService = {

    listar: () => {
        return api.get("/usuario");
    },
    guardar: (datos) => {
        return api.post("/usuario", datos);
    },
    mostrar: (id) => {
        return api.get(`/usuario/${id}`);
    },
    modificar: (id, datos) => {
        return api.put(`/usuario/${id}`, datos);
    },
    eliminar: (id) => {
        return api.delete(`/usuario/${id}`);
    },
}

export default usuarioService;