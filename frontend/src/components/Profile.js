import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [tweetdata,setTweetdata] = useState([]);

  useEffect(() => {
    // Retrieve token from localStorage or sessionStorage
    const token = localStorage.getItem('token');
    // console.log('yes');

    if (!token) {
      navigate('/');
      return;
    }else{
      // Decode the token to extract user data
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    setUserData(decodedToken);
    const owner = decodedToken.id;
    const fetchtweets = async ()=>{
      const response = await axios.post('http://localhost:3001/gettweet/forprofile',{owner});
      // const tweet = await response.json();
      // console.log(response.data);
      setTweetdata(response.data.reverse());
    }
    fetchtweets();
    } 
  },[navigate]);
  useEffect(() => {
    console.log('userData updated:', userData);
  }, [userData]);

  return (
    <div>
    <NavBar/>
    <div className=" bg-white max-w-lg mx-auto p-6">
      <div className="text-center">
      <span> 
      <h1 className="text-2xl font-bold mt-4">{userData.username}</h1>
         <img src={'/dwarkadhish.jpg'} alt="Profile" className="w-24 h-24 rounded-full mx-auto" /></span>
        <p className="text-gray-600">name:{userData.name}</p>
        <p className="text-gray-600">BIo:{userData.Bio}</p>

      </div>
      <div><Link to="/Editprofile"><button>Edit profile</button></Link></div>
      <div className="mt-8">
          <h2 className="text-xl font-bold">Tweets</h2>
          {/* <ul className="mt-4">
            {tweetdata &&
              tweetdata.map(tweet => (
                <li key={tweet.id} className="border-b border-gray-300 py-2">
                  {tweet.content}
                </li>
              ))}
          </ul> */}
            {tweetdata.map((tweet, index) => (
          <div key={index} className="text-white bg-sky-900 border rounded-md p-4 mb-4">
            <p>{tweet.content}</p>
            <p className="text-gray-500">at:{tweet.timestamp}</p>
            <Link to="/profile" className="text-gray-500">Posted by: {tweet.owner}</Link>
          </div> 
         ))}
        </div>
    </div>
    </div>
  );
};

export default Profile;
