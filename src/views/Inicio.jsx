import { Link } from "react-router-dom";

const Inicio = () => {

    return (
        <>
            <h1>Pagina Inicio</h1>

            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.slug}>
                        <Link to={`categoria/${categoria.slug}`}>{categoria.nombre}</Link>                        
                    </li>                                        
                ))}
            </ul>


            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam reiciendis amet eum ratione sed iste labore inventore fugit! Eius, veritatis illo. Magnam ab, consectetur dicta cupiditate hic ut debitis provident.</p>
        </>
    )

}

const categorias = [
    { nombre: 'Muebles', slug: 'muebles', detalle: "Muebles para oficinas"},
    { nombre: 'Electronicos', slug: 'electronicos', detalle: "Todo para PCs"},
    { nombre: 'Ropa', slug: 'ropa', detalle: "Ropa para damas"}
]

export default Inicio;