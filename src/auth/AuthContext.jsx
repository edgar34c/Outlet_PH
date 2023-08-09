import api from "../api/api";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

  const [isSignIn, setIsSignIn] = useState(false)

  useEffect(() =>{
    const loadingStoreData = async () =>{
      const storageUser = localStorage.getItem("@Auth:user")
      if(storageUser){
        setIsSignIn(storageUser)
      }
    }

    loadingStoreData()

  }, [])



  const signIn = async (usuario, senha) =>{
    const response = await api.login(usuario, senha)

    if (data === "Login validado com sucesso") {
      setIsSignIn(true)
      localStorage.setItem("@Auth:user", isSignIn)
  } else {
      alert(data);
  }

  }

  return(
    <AuthContext.Provider value={{signed: !isSignIn, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}