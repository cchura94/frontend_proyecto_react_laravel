import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <Link to="/">INICIO</Link> |
            <Link to="/login">LOGIN</Link> |
            <Link to="/registro">REGISTRO</Link> 
        </>
    )
}

export default NavBar