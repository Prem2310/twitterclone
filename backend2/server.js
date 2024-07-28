import express from "express";
import mongoose from "mongoose";
import userrouter from "./routes/user.js";
import tweetrouter from "./routes/tweetrouter.js";
import twitterrouter2 from "./routes/twitterrouter2.js";
import users from "./models/users.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow cookies and other credentials
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

// app.get('/register',userrouter);
app.use("/register", userrouter);
app.use("/login", userrouter);
app.use("/gettweet", twitterrouter2);
app.use("/tweet", tweetrouter);
app.use("/", userrouter);
app.post("/editprofile", userrouter);
app.get("/", (req, res) => {
  res.send("Helo Word!");
});
const connectdb = async () => {
  try {
    const uri =
      "mongodb+srv://lalit:135790@cluster0.im5ibym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(`${uri}`);
    console.log("Connected to database");
  } catch (error) {
    console.log(error, "Error connecting to database:");
  }
};

// app.get("/register",async(req,res)=>{
//       const username ="lalit"
//       const password ="lalit"
//       const email ="lalit.com"
//       const newUser = new users({username,password,email})
//       try {
//         const user = await newUser.save();
//         res.json(user);
//         res.send(user);
//       } catch (error) {
//         console.log('error saving user', error);
//        }})

app.listen(3001, () => {
  connectdb();
  console.log("Example app listening on port 3001");
});
