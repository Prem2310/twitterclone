import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Please fill in your credentials to login');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
  
    console.log('Login Request:', { username, password });
  
    try {
      const response = await axios.post('http://localhost:3001/login/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert(response.data.message);
      navigate('/feed');
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.status === 400) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center bg-gray-200 p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            id="usernameforlogin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            id="passwordforlogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-64 px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      {error && <div className="mt-5 p-2 text-white bg-red-500 rounded">{error}</div>}
      <div className="mt-5 p-2 text-black bg-gray-300 rounded">{status}</div>
    </div>
  );
};

export default Login;
