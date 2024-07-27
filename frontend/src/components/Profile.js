import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [tweetdata, setTweetdata] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token);
    setUserData(decodedToken);
    const userId = decodedToken.id;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User Profile Response:", response.data);
        setUserData((prevData) => ({ ...prevData, ...response.data }));
        setProfileImage(response.data.profilePic || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchTweets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/gettweet/forprofile",
          { owner: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTweetdata(response.data.reverse());
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchUserProfile();
    fetchTweets();
  }, [navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {userData.username}
          </h1>
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
          />
          <p className="text-lg text-gray-700 mt-2">{userData.name}</p>
          <p className="text-gray-500 mt-1">{userData.bio}</p>
        </div>
        <div className="text-center mt-6">
          <Link to="/Editprofile">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200">
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tweets</h2>
          {tweetdata.length > 0 ? (
            tweetdata.map((tweet, index) => (
              <div
                key={index}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-4 mb-4"
              >
                <p className="text-gray-800 text-lg">{tweet.content}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Posted at: {tweet.timestamp}
                </p>
                <Link
                  to={`/profile/${tweet.owner}`}
                  className="text-blue-500 hover:underline mt-1 block"
                >
                  Posted by: {tweet.owner}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No tweets to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
