// const path = require('path');
// const express = require('express');
// const { request } = require('express');
// const hbs = require('hbs');
// const geocode = require('./utils/geocode');
// const forecast = require('./utils/forecast');
// // console.log(__dirname);
// // console.log(path.join(__dirname, '../'));

// const app = express();

// const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../templates/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

// app.set('view engine', 'hbs');
// app.set('views', viewsPath);
// hbs.registerPartials(partialsPath);

// app.use(express.static(publicDirectoryPath));

// app.get('', (req, res) => {
//   res.render('index', {
//     title: 'Weather App',
//     name: 'Jazer Urrea',
//   });
// });

// app.get('/about', (req, res) => {
//   res.render('about', {
//     title: 'About',
//     name: 'Jazer Urrea',
//   });
// });

// app.get('/help', (req, res) => {
//   res.render('help', {
//     title: 'Help',
//     name: 'Jazer Urrea',
//   });
// });

// app.get('/weather', (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: 'You must provide an address!',
//     });
//   }

//   geocode(
//     req.query.address,
//     (error, { latitude, longitude, location } = {}) => {
//       if (error) {
//         return res.send({ error });
//       }

//       forecast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//           return res.send({ error });
//         }

//         res.send({
//           forecast: forecastData,
//           location,
//           address: req.query.address,
//         });
//       });
//     }
//   );
// });

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'Please provide search term',
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     prodcuts: [],
//   });
// });

// app.get('/help/*', (req, res) => {
//   res.render('404', {
//     title: '404',
//     name: 'Jazer Urrea',
//     errorMessage: 'Help article not found :(',
//   });
// });

// app.get('*', (req, res) => {
//   res.render('404', {
//     title: '404',
//     name: 'Jazer Urrea',
//     errorMessage: 'Error 404: Page not found :(',
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// });

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jazer Urrea',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jazer Urrea',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Jazer Urrea',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jazer Urrea',
    errorMessage: 'Help article not found :(',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jazer Urrea',
    errorMessage: 'Page not found :(',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
