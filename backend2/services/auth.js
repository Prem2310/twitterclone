const sessionidtousermap = new Map();
function setUser(token,user){
    sessionidtousermap.set(token,user);
}
function getUser(token){
    return sessionidtousermap.get(token);
}
export {getUser,setUser};