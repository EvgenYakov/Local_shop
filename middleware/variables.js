module.exports = function (req,res,next){
    res.locals.isAuth = req.session.isAuthTrue;
    res.locals.csrf = req.csrfToken();
    next();
}