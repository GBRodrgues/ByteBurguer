var express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hamburgueria",
});

var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./views");

// use res.render to load up an ejs view file

// login page
app.get("/", function (req, res) {
  res.render("pages/login");
});

// home page
app.get("/home", function (req, res) {
  res.render("pages/home");
});

// database auth
app.post("/auth", function (req, res) {
  // Capture the input fields
  let username = req.body.email;
  let password = req.body.senha;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT * FROM usuario WHERE email = ? AND senha = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          // Redirect to home page
          res.redirect("/home");
        } else {
          res.send("Incorrect Username and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

app.listen(8080);
console.log("Server is listening on port 8080");
