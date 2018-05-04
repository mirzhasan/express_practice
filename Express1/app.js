var express =  require('express');

var app = express();

app.get("/", function(req, res){
    res.send("Welcome to the root page");
    
});

app.get("packagelist", function(req,res){
    res.send("Welcome to package list");
});

app.get("/:type/packages/:id", function(req,res){
    if(req.params.type==="hajj"){
        res.send("This is that hajj package no " + req.params.id);
    }
    else if(req.params.type==="umrah"){
        res.send("This is that umrah package no " + req.params.id);
    }
    else 
        res.send("What is " + req.params.type);
});

app.get("*", function(req, res){
    res.send("Watch out now boy, where you headed?")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("running!");
})