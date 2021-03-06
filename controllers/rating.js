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
         Rating.create(req.body.rating, async function(err, rating){
            if(err){
                console.log(err);
            } else {
                //add username and id to rating
                rating.rating = req.body.rating.text;
                rating.user.id = req.user._id;
                rating.user.username = req.user.username;
                rating.movie.id = req.params.id;
                rating.movie.title = movie.title 
                var ratings = 0
                if (movie.ratings) {
                   ratings = movie.ratings * movie.usernumber + parseInt(req.body.rating.text);
                   ratings = ratings/(movie.usernumber + 1);
                   movie.ratings = ratings;
                   if (movie.usernumber) {
                       movie.usernumber = movie.usernumber + 1;
                   } else {
                       movie.usernumber = 2;
                   }
                }
                else {
                    ratings = parseInt(req.body.rating.text);
                    movie.ratings = ratings;
                    movie.usernumber = 1;
                }
                //save rating
                await rating.save();
                await movie.save();
                // await Movie.findByIdAndUpdate(req.params.id, movie, function(err, movie){
		        //     if(err){
			    //         console.log(err);
		        //     }
		        //     console.log("movie", movie);
		        // });
                console.log(rating);
                req.flash('success', 'Created a rating!');
                res.redirect('/movies/' + movie._id);
            }
         });
        }
    });
 };

 module.exports = {createRating, getRating}
