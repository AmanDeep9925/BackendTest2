const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Crypto = require('crypto');
const User = require('../models/user');


// Using a new google auth strategy via passport
passport.use(new googleStrategy({
    // using credentials
    // hide them
    clientID: '31088932012-eaulpn3ju4rk8nlikfb0q2vcrrg7gn7e.apps.googleusercontent.com',
    clientSecret: 'xqlBr6fCaiGIMhTorxSk-h24',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'

    },(accessToken,refreshToken,profile,done)=>{
        User.findOne({email : profile.emails[0].value}).exec((err,user)=>{
            if(err){
                console.log('Error in google strategy passport',err);
                return;
            }

            // console.log(profile);

            if(user){
                // if user set this user as req.user
                return done(null,user);
            }else{

                // if not found create and it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : profile.id
                },(err,user)=>{
                    if(err){
                        console.log('Error in creating user',err);
                        return;
                    }
                    return  done(null,user);
                })
            }

        })
    }

))

module.exports = passport;