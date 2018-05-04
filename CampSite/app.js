var express = require('express'),
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
 Campground = require("./models/campground"),
    Comment = require("./models/comment"),
     seedDb = require("./seeds.js"),
   passport = require("passport"),
LocalStrategy = require("passport-local"),
        User = require("./models/user");
        
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
        

//seedDb();      

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(require("express-session")({
    secret: "yomama123" ,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   next();
});

app.use(indexRoutes);

app.use("/campgrounds",campgroundRoutes);

// app.use(function(req, res, next){
//     if(req.isAuthenticated()){
//              next();
//     } else
    
//     res.redirect("/login");
// });

app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This shit works");
})