import axios from "axios";
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      setUsername(decodedToken.username || "");
      setName(decodedToken.name || "");
      setBio(decodedToken.Bio || "");
    } catch (error) {
      setError("Invalid token. Please log in again.");
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditUserProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const requestData = {
        userId,
        username,
        name,
        Bio: bio,
        profilePic,
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(
        "http://localhost:3001/editprofile/editprofile",
        requestData,
        config
      );

      console.log("Response Data:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error editing profile:", error);
      console.error("Error details:", error.response?.data); // Log detailed error response
      setError(
        error.response?.data?.message ||
          "An error occurred while editing the profile"
      );
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-profile-container max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
      <form onSubmit={handleEditUserProfile} className="edit-profile-form">
        <div className="form-group mb-4">
          <label className="block text-gray-700 font-bold mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit your username"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Edit your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bio:</label>
          <textarea
            name="bio"
            placeholder="Edit your Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture:</label>
          <input onChange={handleFileChange} type="file" accept="image/*" className="w-full px-3 py-2 border rounded-md" />
          {profilePic && (
            <img
              src={profilePic}
              alt="Profile"
              className="mt-4 w-24 h-24 rounded-full mx-auto"
            />
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
