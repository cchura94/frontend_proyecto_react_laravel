import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import authService from "../services/authService"


const loginUser = (credenciales) => {
    /*
    return fetch('http://127.0.0.1:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
    }).then(res => res.json())
    */

    return axios.post('http://127.0.0.1:8000/api/v1/auth/login', credenciales)

}


const Login = () => {
    const [email, setEmail] = useState()
    const [password, setClave] = useState()
    const [ errores, setErrores ] = useState({})

    const navigate = useNavigate()

    const funIngresar = async (e) => {
        e.preventDefault()
        try {

            const { data } = await authService.loginConLaravel({ email: email, password: password }); //  loginUser({ email: email, password: password })
            console.log(data);
            // guardar el token en LocalStorage
            localStorage.setItem("access_token", data.access_token)
            
            navigate("/")
        } catch (error) {
            console.log(error.response.data)
            setErrores(error.response.data.errors)
            // alert("Error al Autenticar")            
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => {funIngresar(e)}}>

                <label>Correo: </label>
                <input type="email" onChange={e => setEmail(e.target.value)} />
                <span>{errores?.email}</span>
                
                <br />
                <label>Contraseña: </label>
                <input type="password" onChange={e => setClave(e.target.value)} />
                <span>{errores?.password}</span>
                <br />
                <button type="submit">Ingresar</button>

            </form>
        </>
    )

}

export default Login