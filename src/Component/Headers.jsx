import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'


function Headers() {
  const { logoutUser } = useContext(AuthContext)
  return (
    <div>
      <nav class="bg-gray-800
                py-4 text-white fixed 
                w-full top-0 left-0">
        <div class="container mx-auto">
          <ul class="ml-8 space-x-4">
            <li class="inline-block">
              Home
            </li>
            <li class="inline-block">
              <button onClick={logoutUser}>LogOut</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Headers
