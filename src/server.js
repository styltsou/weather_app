const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const PORT = process.env.PORT || 5000;

// Set up handlebars engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));


// - ROUTES -
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Stylianos Tsoumanis'
  });
});

app.get('/map', (req, res) => {
  res.render('map', {
    title: 'Map',
    name: 'Stylianos Tsoumanis'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        res.send({ error });
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      });
    });
  });
});

// Error pages
app.get('/map/*', (req, res) => {
  res.render('404', {
    errorCode: '404',
    errorText: 'Article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorCode: '404',
    errorText: 'Page not found'
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
