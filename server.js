var express = require("express");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.set("views", "./views");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/login");
});

// about page
app.get("/home", function (req, res) {
  res.render("pages/home");
});

app.listen(8080);
console.log("Server is listening on port 8080");
