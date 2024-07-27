import jwt from "jsonwebtoken";

const SECRET_KEY = "nfnf"; // It's recommended to use an environment variable for this in production

const generatewebtoken = (user) => {
  const payload = {
    username: user.username,
    id: user._id,
    email: user.email,
    name: user.name,
    Bio: user.Bio,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  console.log("Generated token payload:", payload);
  return token;
};

const verifyToken = (token, callback) => {
  jwt.verify(token, SECRET_KEY, callback);
};

export { generatewebtoken, verifyToken };
