import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [status ,setStatus] = useState('PLS FILL CREDENTIALS TO LOGIN');
    const navigate = useNavigate();
    const handlelogin = async (event) => {
       event.preventDefault();
        const response = await axios.post('http://localhost:3001/login/login',{username,password});
        // const data = await response.json();
        // setStatus(data.message)
        localStorage.setItem('token', response.data.token);
        alert(response.data.message);
        navigate('/feed');
        // setStatus(`helllo ${response.data.username}`);
    }
  return (
  <>
    <div className='flex flex-col items-center'>
        <form onSubmit={handlelogin} className='flex flex-col items-center'>
            <label htmlFor="username">Username:</label>
            <input type='text' id='usernameforlogin' value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <label htmlFor="password">Password:</label>
            <input type='password' id='passwordforlogin' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button type='submit'  className='rounded hover:bg-red-950  '>Login</button>
        </form>
        <div className='mt-5 p-2 text-white bg-black'>{status}</div>
    </div>
</>
  )
}

export default Login;