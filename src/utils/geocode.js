const request = require("request");
const getGeoCode = (place, callback) => {
    const geoLocationURL = `https://us1.locationiq.com/v1/search?key=pk.05ae403e2fc0aff19550170417ff9911&q=${encodeURIComponent(
      place
    )}&format=json`;
    request({ url: geoLocationURL, json: true }, (error, response) => {
        const { body } = response;
      if (error) {
        callback("Unable to connect to location service!", undefined);
      } else if (body.error) {
        callback(
          "Unable to find location. Try another search.",
          undefined
        );
      } else {
        const location = body[0];
        console.log(
          `Coordinates for ${location.display_name}: Latitude: ${location.lat}, Longitude: ${location.lon}`
        );
        callback(undefined, location);
      }
    });
  };

module.exports = getGeoCode;