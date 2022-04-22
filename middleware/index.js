var Rating = require("../models/rating");
var Movie = require("../models/movie");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
    },
    checkUserRating: function(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Rating.findById(req.params.ratingId, function(err, rating){
               if(rating.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/movies/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("login");
        }
    }
}