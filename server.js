const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next) =>{
  
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}----${req.originalUrl}---${req.path}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  
  });
  next()
});

// app.use((req, res, next) => {

//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//Helpers
hbs.registerHelper('getCurrentYear', () => {
      return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
      return text.toUpperCase();
});



// Route
app.get('/', (req, res) =>{
    res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website'
    });
});

//Route
app.get('/about', (req, res) =>{
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

// Route
app.get('/bad', (req, res) => {
    res.send({
      errorMessage: 'Unable to handle request'
    })
});

//Route
app.get('/projects', (req, res) =>{
    res.render('projects',{
      pageTitle: 'Projects Page'
    })
});

// Listener
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})