import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            {routes.map(route => (
                <NavLink to={route.to} style={({isActive}) => ({color: isActive?'red':'blue'})} key={route.text}>{route.text}</NavLink>
            ))}
        </>
    )
}

const routes = []
routes.push({ to: '/', text: 'INICIO ' })
routes.push({ to: '/login', text: 'LOGIN ' })
routes.push({ to: '/registro', text: 'REGISTRO ' })
routes.push({ to: '/admin/categoria', text: 'CATEGORIA' })

export default NavBar