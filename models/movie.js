var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
    adult: Boolean,
    original_language: String, 
    original_title: String, 
    overview: String,
    title: String, 
    release_date: Date,
    vote_average: Number, 
    vote_count: Number,
    poster_path: String,
    ratings: Number
});

module.exports = mongoose.model("Movie", movieSchema);

