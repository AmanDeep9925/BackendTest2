// Initialize the port
const port = process.env.PORT || 8000;

// Initializing express
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

// Setting up the DB
const db = require('./config/mongoose');


// Using mongo to store the cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-auth-middleware');
const passportGoogle = require('./config/passport-google-oauth-stratgey');
const MongoStore = require('connect-mongo')(session);
// Url encoder
app.use(express.urlencoded());

app.use(express.static('./assets'));

// Setting up the layouts
app.use(expressLayouts);

// accessing cookies
app.use(cookieParser())

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views')

// Using session cookie
app.use(session({
    name : "BookStore",
    secret : "ValarMorghulis",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },(err) =>{
        console.log(err || "Connect MongoDB setup Done :)");
    }
    )
}));

// using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Intitalizing the router
app.use('/',require('./routes'))



app.listen(port,(err) =>{

    if(err){
        console.log(`Error in connecting to server ${err}`);
    }
    console.log(`Server is running @ http://localhost:${port} :)`);
})