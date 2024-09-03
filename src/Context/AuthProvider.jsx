import React, { useState, useEffect, createContext } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
);
console.log(authToken,'aaaaaaauthhhhhhh');  
    
    const [user, setUser] = useState(() =>
        localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null
);
console.log(user,"user decode");

const navigate = useNavigate();

const loginUser = async (e) => {
    e.preventDefault()
    try {
            const response = await axios.post('http://127.0.0.1:8000/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
            if (response.status === 200) {
                const data = response.data;
                console.log(data,"dataaaaaaaaaaa");
                
                setAuthToken(data.access);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authToken', JSON.stringify(data.access));
                localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
                toast.success('sucuess')
                navigate('home');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const updateToken = async () => {
        console.log('Updating token...');

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                refresh: authToken.refresh,
            });
            if (response.status === 200) {
                const data = response.data;
                setAuthToken(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authToken', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error updating token:', error);
            logoutUser();
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
        navigate('/login');
        console.log('User logged out:', user);
        console.log('Auth token removed:', authToken);
    };

    // Automatically refresh the token at intervals or on page reload
    useEffect(() => {
        if (authToken) {
            const interval = setInterval(() => {
                updateToken();
            }, 1000 * 60 * 4); // Update token every 4 minutes

            return () => clearInterval(interval);
        }
    }, [authToken]);

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
