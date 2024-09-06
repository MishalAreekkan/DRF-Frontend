import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';

function Headers() {
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <header className="bg-[#020202] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {user && (
          <Link to='/home' className="text-xl font-bold hover:text-gray-400">
            Home
          </Link>
        )}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={logoutUser}
                className="text-lg hover:text-gray-400 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/login'
              className="text-lg hover:text-gray-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Headers;
