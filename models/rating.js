var mongoose = require("mongoose");

var ratingSchema = mongoose.Schema({
    rating: Number,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    movie:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        },
        Title: String
    }
});

module.exports = mongoose.model("Rating", ratingSchema);