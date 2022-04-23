# growsimplee
This is a movie rating application which is created for the assignment of Grow Simplee.
Using The Movie Database (TMDB), some popular movies along with their information is stored in MongoDB database. All these movies are searched on Open Movie API to fetch their movie ratings. After login, user can view and rate any of the movies present in the database.

# Technology
The tech stack used is: MongoDB, Express.js, and Nodejs.
View Pages are created in ejs, and mongoose framework is used with MongoDB.
The application is created in MVC structure. 

# Documentation
To install and run the application, simply clone this git repostitory and run "npm start" in the directory and visit localhost:8000 in the browser.
All APIs and Routes have view pages linked with them in the application. The basic working of each API is explained here:
1. GET - "/movies" : Fetches all the movies present in the database.
2. GET - "/movies/:id" : Shows all the information related to movie (id) including its rating, release date, overview etc. 
3. GET - "/movies/:id/ratings/new" : Shows all the user ratings related to movie (id).
4. POST - "/movies/:id/ratings/" : Create a new rating in the database with reference to user and movie (id).
5. DELETE - "/movies/:id/ratings/:ratingId" : Lets user delete its rating (ratingId) given for the movie (id).
All the routes checks whether the user is logged in or have the access token before sending the information. Other routes and APIs include some index routes such as login, register, and logout.
