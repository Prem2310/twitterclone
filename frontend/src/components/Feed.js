import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from './navbar';
import { Link, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Feed = () => {
    const navigate = useNavigate();
    const [content,setContent] =useState('');
    const [tweet,setTweet] = useState([]);
    
 
    useEffect(()=>{
      const token = localStorage.getItem('token');
      // const decodedToken = jwtDecode(token);
      // const owner = decodedToken.id;
      if (!token) {
        navigate('/');
        return;
      }else{
        const decodedToken = jwtDecode(token);
        const owner = decodedToken.id;
        const fun = async ()=>{
        const response = await axios.post('http://localhost:3001/gettweet',{owner});
        // const tweet = await response.json();
        console.log(response.data);
        setTweet(response.data.reverse());
       }
       fun();
      }
     
   },[])
    const handleNewTweetSubmit = async(e) => {
      // e.preventDefault();
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const owner = decodedToken.id;
      // const resoponce = await axios.post('https:localhost:3001/tweet',{newtweet});
      const response = await axios.post('http://localhost:3001/tweet',{owner,content});
      // console.log(response.data);
    }   
  return (
<>
<NavBar/>
<div className="flex">
      <div className=" bg-black w-1/4 p-4 flex flex-col m-2 gap-2">
        {/* Left side buttons */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 1
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Button 2
        </button>
      </div>
      <div className=" bg-sky-900 w-1/2 p-4">
        {/* New Tweet input */}
        <form onSubmit={handleNewTweetSubmit}>
          <input
            type="text"
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}
            className="w-full border rounded-md p-2 mb-4"
            placeholder="What's happening?"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tweet
          </button>
        </form>
        {tweet.map((tweet, index) => (
          <div key={index} className="border rounded-md m-2 p-4 mb-4">
            <Link to="/profile" className="text-gray-500">Posted by: {tweet.owner}</Link>
            <p>{tweet.content}</p>
            <p className="text-gray-500">{tweet.timestamp}</p>
          </div> 
         ))}
      </div>
      <div className=" bg-blue-500 text-white  w-1/4 p-4">
        {/* Right side suggestions */}
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
          {/* Suggestions content */}
        </div>
      </div>
    </div>
</>
  )
}

export default Feed;