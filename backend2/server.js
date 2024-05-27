import express from 'express';
import mongoose from 'mongoose';
import userrouter from './routes/user.js';
import tweetrouter from './routes/tweetrouter.js';
import twitterrouter2 from './routes/twitterrouter2.js';
import users from './models/users.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

// app.get('/register',userrouter);
app.use("/register",userrouter);
app.use("/login",userrouter);
app.use("/gettweet",twitterrouter2);
app.use('/tweet',tweetrouter);
app.use('/editprofile',userrouter);
app.get('/', (req, res) => {
  res.send('Helo Word!');
});
const connectdb = async ()=>{
   try {
    const uri = "mongodb+srv://lalit:135790@cluster0.im5ibym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(`${uri}`)
    console.log("Connected to database");
   } catch (error) {
     console.log(error, "Error connecting to database:");
   }

}


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
  console.log('Example app listening on port 3000!');
});