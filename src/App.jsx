import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {AuthProvider } from './context/AuthProvider';
import Headers from './Component/Headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
              <ToastContainer />
          <Headers/>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path='login' element={<Login/>} />
        <Route path='home' element={<Home/>} />
      </Routes>
        </AuthProvider>
  );
}

export default App;
