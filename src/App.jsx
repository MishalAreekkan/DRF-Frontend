import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {AuthProvider } from './Context/AuthProvider';
import Headers from './Component/Headers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './pages/Update';
import Employee from './pages/Employee';

function App() {
  return (
    <AuthProvider>
              <ToastContainer />
          <Headers/>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path='login' element={<Login/>} />
        <Route path='home' element={<Home/>} />
        <Route path='update/:id/' element={<Update/>} />
        <Route path='employee' element={<Employee/>} />
      </Routes>
        </AuthProvider>
  );
}

export default App;
