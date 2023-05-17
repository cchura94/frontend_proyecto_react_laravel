import { useRoutes } from "react-router-dom"
import SitioRoutes from "./SitioRoutes"
import AdminRoutes from "./AdminRoutes";

const ThemeRoutes = () => {
    return useRoutes([SitioRoutes, AdminRoutes])
}

export default ThemeRoutes;