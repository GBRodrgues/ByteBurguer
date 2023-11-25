/*comandos npm
npm init
npm instal nodemon -g 
npm install -- save express
npm install express-session
npm install --save body-parser
npm install --save mysql
npm install ejs -save
*/

//require do express e do session
const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

//require do bodyparser responsável por capturar valores do form
const bodyParser = require("body-parser");

//require do mysql
const mysql = require("mysql");
const { resolveSoa } = require("dns");

//criando a sessão
app.use(session({ secret: "ssshhhhh" }));

//definindo pasta pública para acesso
app.use(express.static("public"));

//config engines
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public"));

//config bodyparser para leitura de post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexão com banco mysql
function conectiondb() {
  var con = mysql.createConnection({
    host: "localhost", // O host do banco. Ex: localhost
    user: "gabriel", // Um usuário do banco. Ex: user
    password: "1234", // A senha do usuário. Ex: user123
    database: "hamburgueria", // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
  });

  //verifica conexao com o banco
  con.connect((err) => {
    if (err) {
      console.log("Erro connecting to database...", err);
      return;
    }
    console.log("Connection established!");
  });

  return con;
}

//rota para login
app.get("/views/login", function (req, res) {
  var message = " ";
  res.render("views/login", { message: message });
});
