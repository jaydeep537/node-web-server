const request = require("request");
const forCast = (letitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=9fad60ea9c5064d30d66c6c0a0fa2ab1&query=${letitude},${longitude}&units=m`;
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        cb("Unable to access forcast service..!", undefined);
      } else if (body.error) {
        cb("Unable to find location", undefined);
      } else {
        cb(
          undefined,
          `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degress out.There is a ${body.current.precip} '% chance of rain.`
        );
      }
    }
  );
};

module.exports = forCast;
