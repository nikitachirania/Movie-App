var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.post("/addresults", function(req, res){
   // in get method we can get data from query
     var query = req.body.search;
    var url = "http://www.omdbapi.com/?t="+query+"&apikey=df9c69f3";
    console.log(url);
    request(url, function(error, response,body){
       //response.statusCode (success code=404 is not found that url)
        if(!error && response.statusCode == 200) {
             var data = JSON.parse(body);
             console.log(data);
            res.render("results",{data:data});
        }
        else 
         console.log("error");
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Movie App Server is up at port ' + port)
});