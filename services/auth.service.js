require('dotenv').config();
// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');


function setUser(user){
    // sessionIdToUserMap.set(id, user);
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}


function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch(error){
        return null
    }
}

module.exports ={
    setUser,
    getUser,
}