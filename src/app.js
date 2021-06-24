const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const foreCast = require("./utils/forcast.js");
const app = express();
//Setup default path and views
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const PORT = process.env.PORT || 3000;
//Setup handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "JS",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "JS",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "Help Message...!",
    name: "JS",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "Please provide address..!" });
  }
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    foreCast(latitude, longitude, (error, foreCast) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        foreCast,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help Article not found..!",
    name: "JS",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found..!",
    name: "JS",
  });
});
app.listen(PORT, () => {
  console.log(`Port Listening at ...! ${PORT}`);
});
