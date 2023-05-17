import SitioLayouts from "../layouts/SitioLayouts";

import Inicio from "../views/Inicio";
import Login from "../views/Login";
import Registro from "../views/Registro";

const SitioRoutes = {
    path: '/',
    element: <SitioLayouts />,
    children: [
        {
            path: '/',
            element: <Inicio></Inicio>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/registro',
            element: <Registro />
        },
        
    ]    
}

export default SitioRoutes;