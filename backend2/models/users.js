import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
    default: [],
  },
  follwoing: {
    type: Array,
    default: [],
  },
  Bio: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
