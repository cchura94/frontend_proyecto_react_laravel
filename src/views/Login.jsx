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
            // localStorage.setItem("auth", JSON.stringify(data.usuario))
            
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

            <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 class="font-bold text-2xl">Welcome to Startup</h3>
            <p class="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section class="mt-10">
            <form class="flex flex-col" method="POST" action="#">
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                    <input type="text" id="email" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
                    <input type="password" id="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                </div>
                <div class="flex justify-end">
                    <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                </div>
                <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
            </form>
        </section>
    </main>
        </>
    )

}

export default Login