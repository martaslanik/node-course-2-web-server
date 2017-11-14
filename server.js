const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express ();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('scremIt', (text) => {
  return text.toUpperCase();
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
  // This code os no longer needed since using hbs
  // res.send('<h1>About Page</h1>');
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my page!'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Sorry unable to process that request',
    otherMessages:[
      '101',
      '102',
      '103'
    ]
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
