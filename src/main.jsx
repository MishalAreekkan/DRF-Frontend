import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
let authToken = JSON.parse(localStorage.getItem('authToken'))

axios.interceptors.request.use((request)=>{
  console.log(request,'lllllllllllllllll');
 if (authToken){
    request.headers.Authorization = `Bearer ${authToken}`
  }
return request;

})


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)
