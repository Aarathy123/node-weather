const request = require("request");

const getForecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=2d07ee1f8d0673fd5e4f53514ef677e4&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      console.error("Unable to connect to weather service!");
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location. Try another search.",
        undefined
      );
    } else {
      const data = body.current;
      const { temperature, feelslike, weather_descriptions } = data;
      console.log(`Current weather in ${body.location.name}:`);
      console.log(
        `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
      console.log(`Weather description: ${weather_descriptions[0]}`);
      callback(undefined, `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
    }
  });
};

module.exports = getForecast;
