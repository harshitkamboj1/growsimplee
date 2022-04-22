
  
var express     = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
passport    = require("passport"),
cookieParser = require("cookie-parser"),
LocalStrategy = require("passport-local"),
flash        = require("connect-flash"),
Movies  = require("./models/movie"),
Ratings     = require("./models/rating"),
User        = require("./models/user"),
session = require("express-session"),
// seedDB      = require("./seeds"),
methodOverride = require("method-override");

//requiring routes
var ratingRoutes    = require("./routes/rating"),
movieRoutes = require("./routes/movie"),
indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://harshittt_0708:98FPeUQM!!wNxJV@cluster0-shard-00-00.mg9jc.mongodb.net:27017,cluster0-shard-00-01.mg9jc.mongodb.net:27017,cluster0-shard-00-02.mg9jc.mongodb.net:27017/growsimplee?ssl=true&replicaSet=atlas-ebl1gq-shard-0&authSource=admin&retryWrites=true&w=majority");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
secret: "Grow Simplee",
resave: false,
saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
res.locals.currentUser = req.user;
res.locals.success = req.flash('success');
res.locals.error = req.flash('error');
next();
});

const axios = require("axios");

// (async () => {
//   const movies = await Movies.find({});
//   // console.log(moviess[0]);
//   movies.forEach((movie) => {
//     axios.get("http://www.omdbapi.com/?t=" + movie.title)
//     .then(res => {
//       console.log("hi");
//       console.log(res.data.results);
//     }).catch((error)=>{});
//   })
// })();
// axios
//   .get('https://api.themoviedb.org/3/movie/popular?api_key=4fb8aff9ab376de2bed2e5d0969cdca9&page=3')
//   .then(async res => {
//     console.log(`statusCode: ${res.status}`)
//     // console.log(res.data.results)
//     res.data.results.forEach(async re => {
//         var movie = {};
//         movie.adult = re.adult;
//         movie.original_language = re.original_language;
//         movie.original_title = re.original_title;
//         movie.title = re.title;
//         movie.release_date = re.release_date;
//         movie.overview = re.overview;
//         movie.poster_path = re.poster_path;
//         movie.vote_count = re.vote_count;
//         movie.vote_average = re.vote_average;
//         await axios.get('https://api.themoviedb.org/3/movie/' + re.id + '/reviews?api_key=4fb8aff9ab376de2bed2e5d0969cdca9&page=1')
//         .then((res) => {
//           console.log(res.data.results[0].author_details.rating);
//           movie.ratings = res.data.results[0].author_details.rating;
//         }).catch((error) => {});
//         Movies.create(movie, function(res){
//             console.log("success");
//         });
//     });
//   })
//   .catch(error => {
//     console.error(error)
//   })


// async function add_data(){

// }();


app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/ratings", ratingRoutes);



app.listen(8000, process.env.IP, function(){
    console.log(process.env.PORT);
    console.log("The Movie Server Has Started!");
});