const express = require('express');
const morgan = require('morgan');
const axios = require("axios");
const dotenv = require("dotenv");
var redis = require("redis");
var responseTime = require("response-time");
dotenv.config();

var client = redis.createClient();
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));
app.use(responseTime())

app.get("/movie/search/:input", (req, res) => {
  let titleSearch = req.params.input;
  axios.get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${titleSearch}`)
    .then(response => {
      res.send(response.data)
    })
});

// app.get("/movie/search/data", (req, res) => {
//   res.send(data);
// })
// app.get("/movie/info", (req,res) => {
//   res.send("database");
// })
app.get("/movie/info/:input", (req, res) => {
  let idSearch = req.params.input;

  var promises = [];
  var obj = {};
  var movies = [];
  var ids = idSearch.split(",")
  ids.map((id) => {
    promises.push(axios.get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}&plot=full`))
  });
  axios.all(promises).then((results) => {
    results.map((response, i) => {
      movies.push(response.data);
    })
    res.send(movies);
  })
})

module.exports = app;


