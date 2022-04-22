
var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware");
var request = require("request");

var getMovies = function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
       if(err){
           console.log(err);
       } else {
           request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                res.render("movies/index",{movies:allMovies});

            }
});
       }
    });
}

var getMovie = function(req, res){
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("ratings").exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            console.log(foundMovie)
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
};

module.exports = {getMovies, getMovie};