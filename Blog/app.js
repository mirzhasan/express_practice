var express= require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    methodOverride = require("method-override");
    
mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(bodyparser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Hey whats up",
//     image:"https://cdn.pixabay.com/photo/2012/11/22/08/19/view-66973__340.jpg",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mollis leo imperdiet, viverra orci posuere, blandit purus. Nullam sollicitudin magna non porttitor tincidunt. Quisque vestibulum nibh nec nunc efficitur suscipit. Proin sit amet faucibus libero, ut iaculis tellus. Vestibulum ultricies accumsan bibendum. Etiam elementum nibh et lectus porta, nec cursus felis sollicitudin. Mauris sollicitudin, felis ut pulvinar suscipit, felis metus luctus elit, sit amet rhoncus est lacus vitae tortor. Nullam porttitor posuere volutpat. Sed aliquam interdum laoreet. Curabitur lobortis maximus massa, a placerat velit suscipit ac. Nullam ac suscipit nulla, sit amet lobortis purus. Vestibulum sit amet felis sit amet diam placerat gravida vitae gravida ligula. Suspendisse scelerisque dapibus nisi vitae fringilla. Fusce dictum egestas magna quis faucibus. Donec dictum elementum pharetra. Praesent convallis risus vitae ultricies euismod. Sed sed quam vitae purus molestie semper ut vitae purus. Etiam ut nisl sit amet risus pulvinar dignissim eget nec velit. Integer varius nunc in purus tempor, id aliquet purus faucibus. Morbi orci est, bibendum eu dui eu, porttitor finibus nisi. Nullam ex erat, ultricies eget lectus ut, vulputate posuere turpis. Sed hendrerit, eros vel tincidunt scelerisque, ipsum diam interdum tellus, ac ultrices nisi odio et nulla. Praesent arcu diam, porttitor nec arcu in, luctus mattis nunc. In diam neque, bibendum a vestibulum sit amet, efficitur a erat. In ac gravida urna. Aenean in nulla iaculis, facilisis leo semper, consequat justo. Vestibulum feugiat viverra libero, vitae auctor ipsum euismod vel. Donec sagittis hendrerit ex nec dictum. Etiam quis consequat augue, eu accumsan urna. Etiam imperdiet sed lectus et accumsan. Etiam a lorem sagittis, lobortis leo quis, tincidunt tortor. Pellentesque a augue non purus vestibulum imperdiet quis a leo. Aenean placerat, felis vel porttitor dignissim, risus erat dignissim ex, non vulputate tellus ligula sed libero. Vestibulum consequat eros leo, elementum euismod augue dapibus id. Donec posuere, orci a eleifend mollis, lectus ipsum dignissim turpis, et placerat odio mi et ante. Vestibulum sit amet venenatis est. Etiam id tempus quam, eget aliquam lorem. Quisque ipsum lacus, consequat sed quam a, fringilla pharetra urna. Etiam varius tortor quis augue accumsan, in aliquet nibh dignissim. Maecenas sed dui congue, congue felis eu, convallis lectus. Duis ac tempor urna. Duis lacinia tempor lacus sed feugiat."
// });



app.get("/", function(req, res){
   res.redirect("/blogs"); 
});



app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error");
        } else {
               res.render("index", {blogs: blogs}); 
        };
    });

});



app.get("/blogs/new", function(req, res){
    res.render("new"); 
});


app.post("/blogs", function(req,res){
   Blog.create(req.body.blog, function(err, blog){
       if(err){
           res.redirect("/blogs/new");
       } else {
           res.redirect("/blogs");
       }
   });
});


app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            res.render("/blogs");
        } else {
            res.render("edit", {blog:blog});
        }
    })
});

app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate( req.params.id, req.body.blog , function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs/"+ req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req,res){
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       } else {
           res.redirect("/blogs");
       }
   }); 
});

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id , function(err, blog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: blog});
       }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("This is working");
});