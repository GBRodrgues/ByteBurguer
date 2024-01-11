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

//----------------------------------------------------------------------------------------------------------

// Função para obter produtos do banco de dados
function getProdutosDoBanco(callback) {
  // Estabelece uma conexão com o banco de dados MySQL
  var connection = mysql.createConnection(connection_data);

  // Executa uma consulta SQL para obter todos os produtos da tabela 'produto'
  connection.query("SELECT * FROM produto", function (error, results, fields) {
    if (error) {
      // Se houver um erro, chama o callback com o erro e 'null' para os resultados
      callback(error, null);
    } else {
      // Se não houver erro, chama o callback com 'null' para o erro e os resultados da consulta
      callback(null, results);
    }

    // Encerra a conexão com o banco de dados após a consulta
    connection.end();
  });
}

// Rota para a página de admin, requer autenticação (requireAuth)
app.get("/admin", requireAuth, function (req, res) {
  // Chama a função para obter produtos do banco de dados
  getProdutosDoBanco(function (error, produtos) {
    if (error) {
      // Se houver um erro ao obter produtos, envia uma resposta de erro (status 500)
      res.status(500).send("Erro ao obter produtos do banco de dados");
    } else {
      // Se não houver erro, renderiza a página 'admin' com os produtos obtidos
      res.render("admin", { produtos: produtos });
    }
  });
});

// Rota para adição de produto (POST)
app.post("/addProduct", function (req, res) {
  // Obtém informações do produto do corpo da requisição
  let nome = req.body.nome;
  let valor = req.body.valor;
  let imagem = req.body.imagem;
  let quantidade = req.body.quantidade;

  // Verifica se todas as informações necessárias foram fornecidas
  if (nome && valor && imagem && quantidade) {
    // Executa uma consulta SQL para adicionar um novo produto à tabela 'produto'
    connection.query(
      "INSERT INTO produto (nome, valor, imagem, quantidade) VALUES (?, ?, ?, ?)",
      [nome, valor, imagem, quantidade],
      function (error, results, fields) {
        if (error) throw error;

        // Redireciona para a página de administração após adicionar o produto
        res.redirect("/admin");
      }
    );
  } else {
    // Se alguma informação estiver faltando, envia uma resposta informando o usuário
    res.send("Envie todas as informações do produto!");
  }
});

// Rota para exclusão de produto
app.get("/deleteProduct/:idProduto", function (req, res) {
  // Obtém o ID do produto a ser excluído dos parâmetros da URL
  let idProduto = req.params.idProduto;

  // Executa uma consulta SQL para excluir o produto da tabela 'produto' pelo ID
  connection.query(
    "DELETE FROM produto WHERE idProduto = ?",
    [idProduto],
    function (error, results, fields) {
      if (error) throw error;

      // Redireciona para a página de administração após excluir o produto
      res.redirect("/admin");
    }
  );
});

// Rota para edição de produto (POST)
app.post("/editProduct/:idProduto", function (req, res) {
  // Obtém o ID do produto e informações atualizadas do corpo da requisição
  let idProduto = req.params.idProduto;
  let nome = req.body.nome;
  let valor = req.body.valor;
  let imagem = req.body.imagem;
  let quantidade = req.body.quantidade;

  // Verifica se todas as informações necessárias foram fornecidas
  if (nome && valor && imagem && quantidade) {
    // Executa uma consulta SQL para atualizar o produto na tabela 'produto' pelo ID
    connection.query(
      "UPDATE produto SET nome = ?, valor = ?, imagem = ?, quantidade = ? WHERE idProduto = ?",
      [nome, valor, imagem, quantidade, idProduto],
      function (error, results, fields) {
        if (error) throw error;

        // Redireciona para a página de administração após editar o produto
        res.redirect("/admin");
      }
    );
  } else {
    // Se alguma informação estiver faltando, envia uma resposta informando o usuário
    res.send("Envie todas as informações do produto!");
  }
});

//---------------------------------------------------------------------------------------------------------------------

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
  console.log(email);
  console.log(password);
  let cripted_pass = hash(email + password);

  if (email && password) {
    connection.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          console.log(cripted_pass);
          console.log(results.senha);

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
  let password = req.body.senha;
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

    function getProdutosDoBanco(callback) {
      // Realiza a consulta no banco de dados
      connection.query(
        "SELECT * FROM produto",
        function (error, results, fields) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, results);
          }
        }
      );
    }

    app.post("/addProduct", function (req, res) {
      let nome = req.body.nome;
      let valor = req.body.valor;
      let imagem = req.body.imagem;
      let quantidade = req.body.quantidade;

      if (nome && valor && imagem && quantidade) {
        connection.query(
          "INSERT INTO produto (nome, valor, imagem, quantidade) VALUES (?, ?, ?, ?)",
          [nome, valor, imagem, quantidade],
          function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.redirect("/admin"); // Redireciona para a página de administração após adicionar o produto
          }
        );
      } else {
        res.send("Envie todas as informações do produto!");
      }
    });

    app.get("/deleteProduct/:idProduto", function (req, res) {
      let idProduto = req.params.idProduto;

      connection.query(
        "DELETE FROM produto WHERE idProduto = ?",
        [idProduto],
        function (error, results, fields) {
          if (error) throw error;
          console.log(results);
          res.redirect("/admin"); // Redireciona para a página de administração após excluir o produto
        }
      );
    });

    app.post("/editProduct/:idProduto", function (req, res) {
      let idProduto = req.params.idProduto;
      let nome = req.body.nome;
      let valor = req.body.valor;
      let imagem = req.body.imagem;
      let quantidade = req.body.quantidade;

      if (nome && valor && imagem && quantidade) {
        connection.query(
          "UPDATE produto SET nome = ?, valor = ?, imagem = ?, quantidade = ? WHERE idProduto = ?",
          [nome, valor, imagem, quantidade, idProduto],
          function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            res.redirect("/admin"); // Redireciona para a página de administração após editar o produto
          }
        );
      } else {
        res.send("Envie todas as informações do produto!");
      }
    });
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
