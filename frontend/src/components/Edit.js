import axios from "axios";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
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

      const response = await axios.post(
        "http://localhost:3001/editprofile",
        {
          userId,
          username,
          name,
          Bio: bio,
          profilePic,
        },
        config
      );

      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error editing profile:", error);
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
    <div className="edit-profile-container">
      <h1 className="page-title">Edit Profile</h1>
      <form onSubmit={handleEditUserProfile} className="edit-profile-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit your username"
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Edit your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            placeholder="Edit your Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input onChange={handleFileChange} type="file" accept="image/*" />
          {profilePic && (
            <img
              src={profilePic}
              alt="Profile"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>
        <button type="submit" className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
