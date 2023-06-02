import { useContext } from "react";
import Context from "../context/UserContext";

const useUser = () => {
    const {token, setToken} = useContext(Context)

    const login = (newToken) => {
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        setToken(null)
    }
    
    return ({
        isLogged: Boolean(token),
        login,
        logout
    })

}

export default useUser;