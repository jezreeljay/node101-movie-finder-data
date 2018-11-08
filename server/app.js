const express = require('express');
const app = express();
const morgan = require('morgan');
const axios = require('axios');
let cache = {};

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers = {'Content-Type': 'application/json'};
app.use(morgan('dev'));

app.get('/', (req, res) => {
    let movieID = req.query.i;
    let movieTitle = req.query.t;
    
switch (true) {
    case (movieID !== undefined):
        axios.get(encodeURI(`http://www.omdbapi.com/?i=${movieID}&apikey=8730e0e`))
            .then((data) => {
            cache[movieID]=data.data;
            //Send API response
            res.send(cache[movieID]).end();
            })
            .catch((err) => {
            console.log(err.res);
            })
        //Send cached data            
        if (cache[movieID] !== undefined) {
            res.send(cache[movieID]).end();
        } else {
            return undefined;
        }
    break;
    case (movieTitle !== undefined):
        axios.get(encodeURI(`http://www.omdbapi.com/?t=${movieTitle}&apikey=8730e0e`))
            .then((data) => {
            cache[movieTitle]=data.data;
            //Send API response
            res.send(cache[movieTitle]).end();
            })
            .catch((err) => {
            console.log(err.res); 
            })
        //Send cached data            
        if (cache[movieTitle] !== undefined) {
            res.send(cache[movieTitle]).end();
        } else {
            return undefined;
        }
    default:
    res.end('No movie to fetch!');
    }
});

app.use('/', (req, res) => {
    res.end('Nada!');
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;