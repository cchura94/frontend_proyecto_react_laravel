import { createContext, useEffect, useState } from "react";

const Context = createContext({})

export function UserContextProvider({ children }){
    
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem("access_token"))
    }, [])

    return (
        <Context.Provider value={{token, setToken}}>
            { children }
        </Context.Provider>
    )
}


export default Context;