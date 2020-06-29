const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log("Error in finding an account :?");
            return done(err);
        }

        if (!user || user.password != password) {
            console.log("UnAuthorized access");
            return done(null, false);
        }
        return done(null, user);
    });
}

));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log("Error in serializing user");
            return done(err);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/login');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;