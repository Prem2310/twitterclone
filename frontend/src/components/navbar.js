import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import {useNavigate } from 'react-router-dom';

function NavBar() {
  const Navigate = useNavigate();
  const handlelogout = () => {
    const token = localStorage.removeItem('token');
    Navigate('/');
  }
  return (
    <nav className="bg-blue-400 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/Logo-Twitter.jpg" alt="Twitter Logo" className="h-8 mr-2" />
        <span className="text-white font-bold text-xl">Twitter</span>
      </div>
      <ul className="flex items-center">
        {/* <li className="mx-3">
          <Link to="/" className="text-white hover:underline">Home</Link>
        </li> */}
        <li className="mx-3">
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
        </li>
        <li className="mx-3">
          <button onClick={handlelogout} className="text-white hover:underline">Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
