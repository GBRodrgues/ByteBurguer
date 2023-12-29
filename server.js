var express = require("express");
const session = require("express-session");
const mysql = require("mysql");
var connection_data = require("./connections.json");
const connection = mysql.createConnection(connection_data);
const { createHash } = require("crypto");
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
  let email = req.body.email;
  let password = req.body.senha;
  let cripted_pass = hash(email + password);

  if (email && password) {
    connection.query(
      "SELECT * FROM usuario WHERE email = ? AND senha = ?",
      [email, cripted_pass],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = email;

          res.redirect("/home");
        } else {
          res.send("Email ou Senha Incorretos!");
        }
        res.end();
      }
    );
  } else {
    res.end();
  }
});

app.post("/register", function (req, res) {
  let username = req.body.nome;
  let password = req.body.pass;
  let email = req.body.email;
  let cripted_pass = hash(email + password);

  if (username && password && email) {
    // Verifica se o e-mail já está cadastrado
    connection.query(
      "SELECT * FROM hamburgueria.usuario WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (error) throw error;

        if (results.length > 0) {
          // O e-mail já está cadastrado
          res.send("Este e-mail já está cadastrado. Por favor, escolha outro.");
        } else {
          // O e-mail não está cadastrado, então insere o novo usuário
          connection.query(
            "INSERT INTO hamburgueria.usuario (nome, email, senha) VALUES(?, ?, ?);",
            [username, email, cripted_pass],
            function (error, results, fields) {
              if (error) throw error;
              console.log(results);
              res.redirect("/");
            }
          );
        }
      }
    );
  } else {
    res.send("Envie todas as credenciais!");
    res.end();
  }
});

app.listen(8080);
console.log("Server is listening on port 8080");

function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}
