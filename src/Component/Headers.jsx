import React, { useContext }  from 'react'
import { AuthContext } from '../context/AuthProvider'


function Headers() {
    const {logoutUser} = useContext(AuthContext)
  return (
    <div>
      <button onClick={logoutUser}>LogOut</button>
    </div>
  )
}

export default Headers
