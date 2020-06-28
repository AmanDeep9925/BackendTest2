// Initialize the port
const port = process.env.PORT || 8000;

// Initializing express
const express = require('express');
const app = express();

app.use('view engine','ejs');
app.use('view','./views')

app.listen(port,(err) =>{

    if(err){
        console.log(`Error in connecting to server ${err}`);
    }
    console.log(`Server is running @ http://localhost:${port} :)`);
})