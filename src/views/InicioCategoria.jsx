import { useNavigate, useParams } from "react-router-dom";

const InicioCategoria = () => {

    const {slug} = useParams()
    const navigate = useNavigate()

    return (
        <>
            <h1>{slug}</h1>

            <button onClick={() => navigate("/") }>Volver</button>
        </>
    )

}

export default InicioCategoria;