const {getUser} = require('../services/auth.service')

function checkForAuthentication(req, res, next){
    const tokenCookie =  req.cookies?.token;
    req.user=null;

    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user= getUser(token);
    req.user = user;
    next();
}

function restrictToRole(role = []){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');

         if(!role.includes(req.user.role)) return res.end('You are unathorized');

        next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictToRole
};