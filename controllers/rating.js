var express = require("express");
var router  = express.Router({mergeParams: true});
var Movie = require("../models/movie");
var Rating = require("../models/rating");
var middleware = require("../middleware");

var getRating = function(req, res){
    // find movie by id
    console.log(req.params.id);
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
        } else {
             res.render("ratings/new", {movie: movie});
        }
    })
};

var createRating = function(req, res){
    //lookup movie using ID
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
            res.redirect("/movies");
        } else {
         Rating.create(req.body.rating, function(err, rating){
            if(err){
                console.log(err);
            } else {
                //add username and id to rating
                rating.rating = req.body.rating.text;
                rating.user.id = req.user._id;
                rating.user.username = req.user.username;
                rating.movie.id = req.params.id;
                rating.movie.title = movie.title 
                //save rating
                rating.save();
                console.log(rating);
                req.flash('success', 'Created a rating!');
                res.redirect('/movies/' + movie._id);
            }
         });
        }
    });
 };

 module.exports = {createRating, getRating}