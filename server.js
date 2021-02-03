var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
 
var app = express();
var PORT = process.env.PORT || 8080;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

require("./Develop/routes/api-routes")(app);
require("./Develop/routes/html-routes")(app);

app.listen(PORT, function(){
    console.log("App is listening on PORT: " + PORT);
});