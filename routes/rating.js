
var controller = require("../controllers/rating")
var express = require("express");
var router  = express.Router({mergeParams: true});
var Movie = require("../models/movie");
var Rating = require("../models/rating");
var middleware = require("../middleware");

//Ratings New
router.get("/new", middleware.isLoggedIn, controller.getRating);

//Ratings Create
router.post("/",middleware.isLoggedIn, controller.createRating);

router.get("/:ratingId/edit", middleware.isLoggedIn, function(req, res){
    // find movie by id
    Rating.findById(req.params.ratingId, function(err, rating){
        if(err){
            console.log(err);
        } else {
             res.render("ratings/edit", {movie_id: req.params.id, rating: rating});
        }
    })
});

router.put("/:ratingId", function(req, res){
   Rating.findByIdAndUpdate(req.params.ratingId, req.body.rating, function(err, rating){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/movies/" + req.params.id);
       }
   }); 
});

router.delete("/:ratingId",middleware.checkUserRating, function(req, res){
    Rating.findByIdAndRemove(req.params.ratingId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    })
});

module.exports = router;