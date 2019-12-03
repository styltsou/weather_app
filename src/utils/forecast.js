const request = require('request');

const forecast = (lat, long, callback) => {
  const apiUrl = `${process.env.DARKSKY_API_BASE_URL}${process.env.DARKSKY_API_KEY}/${lat},${long}?units=si`;

  request({ url: apiUrl, json: true }, (error, res) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (res.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const currentWeather = res.body.currently;

      callback(undefined, {
        summary: res.body.daily.data[0].summary,
        temperature: currentWeather.temperature,
        precipProbability: currentWeather.precipProbability
      });
    }
  });
};

module.exports = forecast;
