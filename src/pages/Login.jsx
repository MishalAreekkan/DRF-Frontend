import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

function Login() {
  const navigate = useNavigate();
  const { loginUser, authToken, user } = useContext(AuthContext);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
