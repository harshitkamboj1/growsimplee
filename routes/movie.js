
var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware");
var request = require("request");
var controller = require("../controllers/movie");

//INDEX - show all Movies
router.get("/", middleware.isLoggedIn,controller.getMovies);


// SHOW - shows more info about one movie
router.get("/:id", middleware.isLoggedIn, controller.getMovie);


module.exports = router;