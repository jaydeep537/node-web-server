const request = require("request");
const geocode = (address, cb) => {
  url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1IjoiamF5ZGVlcDUzNyIsImEiOiJja3ByNjN3enkwMTJjMnVvNjAzNXZqdGVpIn0.wew3DwTNobOyJ8unoRqpag&limit=1`;
  request(
    {
      uri: url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        cb("Unable to access geocode service", undefined);
      } else if (body.features.length == 0) {
        cb(`No search resut found for${address}`, undefined);
      } else {
        cb(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    }
  );
};
module.exports = geocode;
