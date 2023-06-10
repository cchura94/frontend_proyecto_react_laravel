import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import authService from "../services/authService"
import useUser from "../hooks/useUser"

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
    const [errores, setErrores] = useState({})
    const [state, setState] = useState({loading: false, error: false})

    const { isLogged, login } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        if (isLogged) navigate("/admin/producto")
    }, [isLogged])

    const funIngresar = async (e) => {
        e.preventDefault()
        try {
            setState({loading: true, error: false})

            const { data } = await authService.loginConLaravel({ email: email, password: password }); //  loginUser({ email: email, password: password })
            console.log(data);
            setState({loading: false, error: false})
            // guardar el token en LocalStorage
            localStorage.setItem("access_token", data.access_token)
            // localStorage.setItem("auth", JSON.stringify(data.usuario))
            login(data.access_token)

            navigate("/admin/producto")
        } catch (error) {
            console.log(error.response.data)
            setErrores(error.response.data.errors)
            setState({loading: false, error: true})
            // alert("Error al Autenticar")            
        }
    }

    return (
        <>
            {
                /*<h1>Login</h1>
            <form onSubmit={(e) => { funIngresar(e) }}>

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
            */}

            <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 class="font-bold text-2xl">Bienvenido</h3>
                    <p class="text-gray-600 pt-2">Debes Ingresar tus credenciales</p>
                </section>



                <section class="mt-10">
                    <form class="flex flex-col" onSubmit={(e) => { funIngresar(e) }}>
                        <div class="mb-6 pt-3 rounded bg-gray-200">
                            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Ingrese su Correo</label>
                            <input type="text" id="email" onChange={e => setEmail(e.target.value)} class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                            <span className="text-red-500">{errores?.email}</span>
                        </div>
                        <div class="mb-6 pt-3 rounded bg-gray-200">
                            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Contraseña</label>
                            <input type="password" id="password" onChange={e => setClave(e.target.value)} class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                            <span className="text-red-500">{errores?.password}</span>
                        </div>
                        <div class="flex justify-end">
                            <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                        </div>
                        {state.loading && 
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        }

                        {!state.loading &&
                        <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Ingresar</button>
                        }
                        {state.error && <span className="text-red-500">Error de Autenticacion</span>}
                    </form>
                </section>

            </main>
        </>
    )

}

export default Login