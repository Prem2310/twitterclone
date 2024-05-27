import {getUser} from '../services/auth';
async function restricatedtologgedinonly (req, res, next) {
    const tokenid = req.cookies.token;
    if(!tokenid){
        return res.status(401).json({message: "you are not logged in"})
    }{const user = await getUser(tokenid);
    }

}