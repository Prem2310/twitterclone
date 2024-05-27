// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    // const [formData, setFormData] = useState({
    //     username: '',
    //     password: '',
    //     email: ''
    // });
    const [username, setUsername] =  useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register/register',{username,password,email});

            localStorage.setItem('token', response.data.token);
            alert(response.data.message);
            navigate('/feed');
        } catch (error) {
            console.log(error);
        }
    };

    return (<>
        <nav className="bg-blue-400 p-4 m-1 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/Logo-Twitter.jpg" alt="Twitter Logo" className="h-8 mr-2" />
          <span className="text-white font-bold text-xl">Twitter</span>
        </div>
        <ul className="flex items-center">
          {/* <li className="mx-3">
            <Link to="/" className="text-white hover:underline">Home</Link>
          </li> */}
          {/* <li className="mx-3">
            <Link to="/feed" className="text-white hover:underline">Home</Link>
          </li>
          <li className="mx-3">
            <Link to="/notifications" className="text-white hover:underline">Notifications</Link>
          </li>
          <li className="mx-3">
            <Link to="/messages" className="text-white hover:underline">Messages</Link>
          </li>
          <li className="mx-3">
            <Link to="/profile" className="text-white hover:underline">Profile</Link>
          </li> */}
        </ul>
      </nav>
        <div className=' m-3 flex  flex-col items-center'>
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required /><br /><br />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required /><br /><br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required /><br /><br />

                <button type="submit" className='rounded '>Register</button>
            </form>
        </div></>
    );
};

export default RegistrationForm;
