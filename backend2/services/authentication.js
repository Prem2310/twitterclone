import jwt from 'jsonwebtoken';

const secretkey = 'nfnf';

const generatewebtoken = (user)=>{
    const payload = {
        username :user.username,
        id : user._id,
        email : user.email,
        name: user.name,
        Bio: user.Bio
    };
    const token = jwt.sign(payload,secretkey);
    console.log(payload);
    return token;
}               
export {generatewebtoken};