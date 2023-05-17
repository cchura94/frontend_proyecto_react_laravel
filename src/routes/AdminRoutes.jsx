import AdminLayouts from "../layouts/AdminLayouts";
import Registro from "../views/Registro";

import Categoria from "../views/admin/Categoria";

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
        }
        
    ]    
}

export default AdminRoutes;