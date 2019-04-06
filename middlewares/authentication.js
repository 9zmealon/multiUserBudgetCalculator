function checkAuthentication(req,res,next)
{
    if(!req.isAuthenticated()){
        return res.send('Please login.')
    }
    next();
}

function checkAdmin(req,res,next){
    if(req.user.email == 'sanjaydari'){
        next();
    } else{
        return res.send("You are not sanjay0")
    }
}

module.exports.isLoggedIn = checkAuthentication;//-------login check
module.exports.checkSanjay = checkAdmin//-------admin check