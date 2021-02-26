const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2538e403a625925ed4f065dcc95a99e8&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to internet!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It's currently " +
          body.current.temperature +
          ' degrees out.' +
          '\n' +
          'It feels like ' +
          body.current.feelslike +
          ' degrees out'
      );
    }
  });
};

module.exports = forecast;
