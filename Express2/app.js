var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

var friendsList = ["Ali", "mohsin", "hasan", "panchode", "toes"];

app.get("/", function(req,res){
    res.render("home");
});

app.get("/friends", function(req,res){
   res.render("friends", {friends : friendsList}); 
});

app.post("/addfriend", function(req, res){
    var buffer = req.body.name;
    friendsList.push(buffer);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("this shit runs");
})