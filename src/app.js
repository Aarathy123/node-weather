const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/weather");
const app = express();

// Define the path to the public directory and views directory
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set the view engine to Handlebars (hbs)
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Middleware to serve static files from the public directory
app.use(express.static(publicPathDirectory));

app.get('/', (req, res) => {
  res.render("index", {
    title: "Weather App",
    header: "Weather",
    content: 'Welcome to the Weather App',
    year: '2025',
    name: 'Weather Team',
  });
}
);

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    header: "About",
    content: 'Learn more about our Weather App',
    year: '2025',
    name: 'Weather Team',
  });
}
);

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: 'Get assistance with the Weather App',
    name: 'Weather Team',
  });
}
);

app.get("/products", (req, res) => {
  const searchQuery = req.query.search;
  if (!searchQuery) {
    return res.status(400).send({
      error: "You must provide a search term",
    });
  }
  // Simulate fetching products based on the search query
  res.send({
    products: [`Product 1 matching ${searchQuery}`, `Product 2 matching ${searchQuery}`],
    year: '2025',
    name: 'Weather Team',
  });
}
);
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).send({
      error: "You must provide an address",
    });
  }
  geocode(address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.status(400).send({ error: "Unable to find location. Try another search." });
    }

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.status(500).send({ error: "Unable to fetch weather data." });
      }
      res.send({
        location,
        forecast: forecastData,
        address
      });
    });
  }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    year: '2025',
    name: 'Weather Team',
  });
});


app.listen(3000, () => {
  console.log("Server is up and running on http://localhost:3000");
});
