const express = require("express");
const path = require("path");
const fs = require("fs");
 
// initializing express server
const app = express();
const PORT = process.env.PORT || 8080;
 
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

// routes
require("./Develop/routes/api-routes")(app);
require("./Develop/routes/html-routes")(app);

// start server on PORT
app.listen(PORT, function(){
    console.log("App is listening on PORT: " + PORT);
});