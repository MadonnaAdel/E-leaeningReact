import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { UserInfo } from "../utils/utilities";

interface AuthContextValues {
    user:UserInfo;
    setUser: Dispatch<SetStateAction<null>>
}

const AuthContext = createContext({} as AuthContextValues);

export function AuthProvider({children}:{children:ReactNode}):JSX.Element{

  const [user, setUser] = useState(()=>{
    return JSON.parse(localStorage.getItem('e-learning-user') || 'null') ;
  });
  
  useEffect(()=>{
     if(user){
       localStorage.setItem('e-learning-user', JSON.stringify(user));
     }
     else{
      localStorage.removeItem('e-learning-user');
     }

  },[user]);

  return <AuthContext.Provider value={{user, setUser}}>
     {children}
  </AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext);
    
    if(!context) throw new Error('AuthContext used out of scope');

    return context;
}