import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectRoute({children}) {
    const token = localStorage.getItem('authToken')
    if(!token){
        return <Navigate to='/login'/>
    }
  return children;  
}

export default ProtectRoute
