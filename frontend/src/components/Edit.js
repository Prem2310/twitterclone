import axios from 'axios';
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [name,setname] = useState('');
    const [Bio,setBio] = useState('');

  
    const handleedituserprofile = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const decodetoken = jwtDecode(token);
      const owner = decodetoken.id;
      console.log(owner);
      try {
        const response = await axios.post('http://localhost:3001/editprofile',{username,name,Bio,owner})
        navigate('/profile');
        console.log(response);
      } catch (error){
        console.log(error)
      }  

    }
  return (
    <>
    <form onSubmit={handleedituserprofile}>
        <input type='text' name='username'value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='edit your username' />
        <input type='text' name='name' placeholder='edit your name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
        <input type='text' name='Bio' placeholder='edit your Bio' value={Bio}    onChange={(e)=>{setBio(e.target.value)}}/>
      <button type='submit'>Done</button>
    </form>
    </>
  )
}

export default Edit