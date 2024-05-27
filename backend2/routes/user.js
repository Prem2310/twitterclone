import  express  from "express";
const router = express.Router();
import users from "../models/users.js";
import {v4 as uuid4} from 'uuid';
import { setUser } from "../services/auth.js";
import {generatewebtoken} from '../services/authentication.js'

router.post("/register", async(req, res) => {
    // const username = "feih"
    // const password = "feih"
    // const email = "feih@gmail.com"
    const {username, password, email} =  req.body;
    const newuser = new users({username, password, email});
    try {
        const user = await newuser.save();
        // res.json(user);

        const token = generatewebtoken(user);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: "registerd succesfully", token });
        console.log(token);
    } catch (error) {
        console.error(error,"error in creating a user")
    }
});

router.post('/login', async (req, res) => {
    const {username,password}= req.body;
    const user = await users.findOne({username: username})
    if(!user){
        res.json({message: "user not found"})
    }else{if(password !=user.password){res.json({message: "password  IS incorrect"})}
     else{
        // const token = uuid4();
        // setUser(user,token);
        // res.cookie('token',user,{httpOnly:true});
        // res.send(user)
        const token = generatewebtoken(user);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: "Login successful", token });
        console.log(token);
        // res.json({message: "login successful"},token);
    };
    }}
)
router.post('/', async (req, res)=>{
console.log(req.body);
const {username, name,Bio,owner} = req.body;
// console.log(owner);
// const user = await users.findOne({_id:owner });
const user = await users.findOne({_id: owner})
// console.log(user);
if(!user){
    res.json({message: "user not found"})
}else{
    user.username = username;
    user.name = name;
    user.Bio = Bio;
    const updateduser = await user.save();
    res.json(updateduser);
    console.log(updateduser);
}});

export default router;