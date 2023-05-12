import api from "./api";

const authService = {

    loginConLaravel: (credenciales) => {
        return api.post("/v1/auth/login", credenciales);
    },
    perfilConLaravel: () => {
        return api.get("/v1/auth/perfil");
    },
    registroConLaravel: () => {
        return api.post("/v1/auth/registro");
    },
    salirConLaravel: () => {
        return api.post("/v1/auth/salir");
    } 

}

export default authService