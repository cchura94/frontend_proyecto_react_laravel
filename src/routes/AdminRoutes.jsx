import AdminLayouts from "../layouts/AdminLayouts";
import Registro from "../views/Registro";

import Categoria from "../views/admin/Categoria";
import Producto from "../views/admin/producto/Producto";

const AdminRoutes = {
    path: '/admin',
    element: <AdminLayouts />,
    children: [
        {
            path: '',
            element: <Registro></Registro>
        },
        {
            path: 'categoria',
            element: <Categoria></Categoria>
        },
        {
            path: 'producto',
            element: <Producto></Producto>
        }
        
    ]    
}

export default AdminRoutes;