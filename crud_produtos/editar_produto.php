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

    // Obter dados do formulário
    $idProduto = $_POST['idProduto'];
    $nome = $_POST['nome'];
    $valor = $_POST['valor'];
    $imagem = $_POST['imagem'];
    $quantidade = $_POST['quantidade'];

    // Atualizar produto no banco de dados
    $sqlUpdate = "UPDATE produto SET nome='$nome', valor=$valor, imagem='$imagem', quantidade=$quantidade WHERE idProduto=$idProduto";
    $conn->query($sqlUpdate);

    // Redirecionar para a página principal
    header("Location: index.php");
    exit();
}

// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "hamburgueria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Obter o ID do produto da URL
$idProduto = $_GET['id'];

// Consultar o produto com base no ID
$sqlSelectOne = "SELECT * FROM produto WHERE idProduto = $idProduto";
$result = $conn->query($sqlSelectOne);
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Produto</title>
</head
