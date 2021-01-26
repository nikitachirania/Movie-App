var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var request = require("request");

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function(req, res){
   res.render("search");
});

app.post("/addresults", function(req, res){
   // in get method we can get data from query
     var query = req.body.search;
    var url = "http://www.omdbapi.com/?t="+query+"&apikey=df9c69f3";
    request(url, function(error, response,body){
        if(error){
            res.render('results', {data: null, error: 'Error, please try again'});
          }
        else{
            var data = JSON.parse(body);
            if(data.Response=="True") {
               res.render("results",{data:data, error: null});
             }
           else 
                res.render('results', {data: null, error: 'Error, please try again'});
        }
    });
});


app.listen(port, () => {
    console.log('Movie App Server is up at port ' + port)
});