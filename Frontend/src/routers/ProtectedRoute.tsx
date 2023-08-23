import React from 'react'
import  useAuth  from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom'
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth()
  
 return currentUser ? children : <Navigate to="/Signin"/>
}

export default ProtectedRoute;