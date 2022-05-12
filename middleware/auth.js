module.exports = function (req,res,next){
    if (!req.session.isAuthTrue){
        return res.redirect('/auth/login')
    }
    next();
}