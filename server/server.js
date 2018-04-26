const express = require('express');
const morgan = require('morgan');
const axios = require("axios");
const dotenv = require("dotenv");
var Redis = require("ioredis");
var bodyParser = require("body-parser");
const data = require("./data.json");
const plot = require("./plot.json");
var responseTime = require("response-time");
dotenv.config();

const redis = new Redis({port: 6380, host: "127.0.0.1"});
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));
app.use(responseTime())

app.get("/movie/search/:input", (req, res) => {
  let titleSearch = req.params.input;
  const search = `${titleSearch}`;

  redis.get(search, (err, result) => {
      if(result) {
        console.log("not logged");
      res.send(result)
    } else {
      axios.get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${titleSearch}`)
        .then(response => {   
            if(!err && response.status === 200) {
              redis.set(titleSearch, JSON.stringify(response.data), "EX", 240) 
            }
          console.log("response", response.status);
          res.send(response.data)
        })
        .catch(err => {
          res.status(404).send(err);
        })
    }
  })

});

// app.get("/movie/search", (req, res) => {
//   res.send(data);
// })
// app.get("/movie/info", (req, res) => {
//   res.send(plot);
// })
app.get("/movie/info/:input", (req, res) => {
  let idSearch = req.params.input;

  var promises = [];
  var obj = {};
  var movies = [];
  var ids = idSearch.split(",")
  var stringSearch = JSON.stringify(ids);
  redis.get(stringSearch, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      ids.map((id) => {
        promises.push(axios.get(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${id}&plot=full`))
      });
      axios.all(promises).then((results) => {
        results.map((response, i) => {
          movies.push(response.data);
        })
        const movieString = JSON.stringify(movies);
        redis.set(stringSearch, movieString, "EX", 240)
        res.send(movies);
      })
    } 
  })
})

module.exports = app;


