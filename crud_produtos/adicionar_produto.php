<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conexão com o banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "hamburgueria";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    $nome = $_POST['nome'];
    $valor = $_POST['valor'];
    $imagem = $_POST['imagem'];
    $quantidade = $_POST['quantidade'];

    $sqlInsert = "INSERT INTO produto (nome, valor, imagem, quantidade) VALUES ('$nome', $valor, '$imagem', $quantidade)";
    $conn->query($sqlInsert);

    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Adicionar Novo Produto</title>
</head>
<body>

    <h2>Adicionar Novo Produto</h2>

    <form action="adicionar_produto.php" method="post">
        <label for="nome">Nome:</label>
        <input type="text" name="nome" required>
        <br>

        <label for="valor">Valor:</label>
        <input type="text" name="valor" required>
        <br>

        <label for="imagem">Imagem:</label>
        <input type="text" name="imagem">
        <br>

        <label for="quantidade">Quantidade:</label>
        <input type="text" name="quantidade" required>
        <br>

        <input type="submit" value="Adicionar Produto">
    </form>

</body>
</html>
