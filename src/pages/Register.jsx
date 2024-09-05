import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const ref = useRef()
  const nav = useNavigate()
  const registerApi =async(first_name,email,password,password2)=>{
    try{
      const response = await axios.post(`http://127.0.0.1:8000/register/`,{
        first_name,email,password,password2
      })
      console.log('register_data:',response.data);
      nav('login')
    }
    catch(error){
        console.log(error);
    }
  }

  const registerSubmit =(e)=>{
    e.preventDefault()
    let firstname = ref.current.firstname.value
    let email = ref.current.email.value
    let password = ref.current.password.value
    let password2 = ref.current.password2.value
    console.log(firstname,'first')
    registerApi(firstname,email,password,password2)
  }

  return (
    <div>
      <h1>Register</h1>
      <form ref={ref} onSubmit={registerSubmit}>
        <input type="text" placeholder='First Name' name='firstname' required/>
        <input type="email" placeholder='Email' name='email' required />
        <input type="password" placeholder='Password' name='password' required />
        <input type="password" placeholder='Confirm Password' name='password2' required />
        <button type='submit' >Sign in</button>
      </form>
      
    </div>
  )
}

export default Register
