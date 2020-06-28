// Initialize the port
const port = process.env.PORT || 8000;

// Initializing express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Setting up the DB

// Setting up the layouts
app.use(expressLayouts);

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views')

// Intitalizing the router
app.use('/',require('./routes'))

app.listen(port,(err) =>{

    if(err){
        console.log(`Error in connecting to server ${err}`);
    }
    console.log(`Server is running @ http://localhost:${port} :)`);
})