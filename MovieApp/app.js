var express = require("express");
var app= express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search"); 
});

app.get("/result", function(req, res){
    var url= "http://www.omdbapi.com/?s=" + req.query.term + "&apikey=thewdb";
    console.log(url);
  request.get(url, function(error, response, body){
       if(!error && response.statusCode==200){
           var data= JSON.parse(body);
           console.log(data);
          res.render("result", {data: data});
       }
  });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("this movie shit runs");
});