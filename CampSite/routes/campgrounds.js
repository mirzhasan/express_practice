var express= require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req,res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("Something went wrong in /campgrounds get method");
            console.log(err);
        } else {
            res.render("./campgrounds/campgrounds", {campgrounds : campgrounds});
        }
    });
    
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("./campgrounds/new");
});

router.post("/", isLoggedIn, function(req, res){
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name: req.body.name, image: req.body.image, description: req.body.desc, author: author };
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log("Error found in /campgrounds post method");
            console.log(err);
        } else{
                console.log("Entered /campgrounds post redirection");
                res.redirect("/campgrounds");
        }
    });
    
});

router.get("/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("./campgrounds/show", {campground: foundCampground});
       }
   });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect("/login");
}


module.exports = router;