import axios from "axios";

const url = "http://127.0.0.1:8000/api"

const token = "TOKEN DE LARAVEL ********"

const api = axios.create({
    baseURL: url,
    headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
        
        // autorizacion
    },
    timeout: 30000
});

// capturar e interceptar errores 401, 403
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 401, 403
        if(error.response.status === 401) {
            // redireccionar al login
            console.log("ERROR EN EL INTERCEPTOR")
        }
        if(error.response.status === 403) {
            // redireccionar al login
        }
        /*
        if(error.response.status === 408) {
            alert("Excedio el tiempo")
        }
        */
        return Promise.reject(error)
    }
);

const apiService = {
    get: (url, params) => api.get(url, {params}),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url) => api.delete(url),
}

export default apiService;
