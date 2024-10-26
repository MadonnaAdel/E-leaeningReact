import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({children}:{children:ReactNode}):ReactNode | null{
   const {user} = useAuth();

   if(!user) return <Navigate to={'/login'}/>

    return children;
}