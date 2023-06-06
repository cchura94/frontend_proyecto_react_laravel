import AdminLayouts from "../layouts/AdminLayouts";
import Registro from "../views/Registro";

import Categoria from "../views/admin/Categoria";
import Pedido from "../views/admin/pedido/Pedido";
import PedidoNuevo from "../views/admin/pedido/PedidoNuevo";
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
        },
        {
            path: 'pedido',
            element: <Pedido></Pedido>
        },
        {
            path: 'pedido/nuevo',
            element: <PedidoNuevo></PedidoNuevo>
        }
        
    ]    
}

export default AdminRoutes;