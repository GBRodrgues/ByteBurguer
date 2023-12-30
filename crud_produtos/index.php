<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "hamburgueria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Operação de exclusão
if (isset($_GET['delete'])) {
    $idProduto = $_GET['delete'];
    $sqlDelete = "DELETE FROM produto WHERE idProduto = $idProduto";
    $conn->query($sqlDelete);
}

// Consulta para obter a lista de produtos
$sqlSelect = "SELECT * FROM produto";
$result = $conn->query($sqlSelect);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD de Produtos</title>
</head>
<body>

    <h2>Listagem de Produtos</h2>

    <table border="1">
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Imagem</th>
            <th>Quantidade</th>
            <th>Ações</th>
        </tr>

        <?php
        // Exibir os produtos na tabela
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>{$row['idProduto']}</td>";
            echo "<td>{$row['nome']}</td>";
            echo "<td>{$row['valor']}</td>";
            echo "<td>{$row['imagem']}</td>";
            echo "<td>{$row['quantidade']}</td>";
            echo "<td><a href='editar_produto.php?id={$row['idProduto']}'>Editar</a> | 
                      <a href='index.php?delete={$row['idProduto']}'>Excluir</a></td>";
            echo "</tr>";
        }
        ?>

    </table>

    <p><a href="adicionar_produto.php">Adicionar Novo Produto</a></p>

</body>
</html>

<?php
// Fechar a conexão com o banco de dados
$conn->close();
?>
