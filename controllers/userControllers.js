const User = require('../models/user')

module.exports.login = (req,res) =>{
    return res.render('login');
}

module.exports.signup = (req,res) =>{
    return res.render('signup');
}

module.exports.create = (req,res) =>{
    if(req.body.password != req.body.confirmpassword){
        console.log("password not matched");
        return res.redirect('back');
    }

    User.findOne({email : req.body.email } ,(err,user) =>{
        if(err){
            console.log("Error in finding the user :/");
            return;
        }

        if(!user){
            User.create(req.body,(err,user) =>{
                if(err){
                    console.log("Unable to create a user");
                    return;
                }

                return res.redirect('/user/login');
            })
        }else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession = (req,res) =>{
    console.log("Logged In Successfully :)");
    return res.redirect('/');
}

module.exports.destroySession = (req,res) =>{
    req.logout();
    console.log("Logged Out Successfully :)");
    return res.redirect('/');
}