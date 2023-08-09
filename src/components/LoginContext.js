import {useState, createContext, useContext} from 'react'

export const LoginContext = createContext()

export const LoginProvider = ({children}) =>{
    const [logado, setLogado] = useState(false)

    function logoff(){
        setLogado(false)
        localStorage.removeItem('logado');
    }
    
    return(
        <LoginContext.Provider value={{logado, setLogado, logoff}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = ()=>{
    const login = useContext(LoginContext)
    return login
}