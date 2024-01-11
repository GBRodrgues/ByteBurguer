// Seleciona o formulário de adição de produto
var formAddProduct = document.querySelector("#formAddProduct");

// Adiciona um ouvinte de eventos ao botão de adicionar produto para exibir o formulário
document.querySelector("#btnAddProduct").addEventListener("click", () => {
  formAddProduct.style.left = "25px";
});

// Adiciona um ouvinte de eventos ao botão de cancelar para esconder o formulário de adição de produto
document.querySelector("#btnCancelAddProduct").addEventListener("click", () => {
  formAddProduct.style.left = "-450px";
});

// Seleciona os elementos do formulário de adição de produto
var addProductForm = document.querySelector("#formAddProduct");
var addProductNameInput = document.querySelector("#addProductName");
var addProductValueInput = document.querySelector("#addProductValue");
var addProductImageInput = document.querySelector("#addProductImage");
var addProductQuantityInput = document.querySelector("#addProductQuantity");

// Adiciona um ouvinte de eventos para o envio do formulário de adição de produto
addProductForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Chama a função para adicionar um novo produto, passando os valores do formulário como parâmetros
  adicionarProduto({
    nome: addProductNameInput.value,
    valor: addProductValueInput.value,
    imagem: addProductImageInput.value,
    quantidade: addProductQuantityInput.value,
  });
});

// Função para adicionar um novo produto fazendo uma chamada AJAX para o backend
function adicionarProduto(produto) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Atualiza a tabela de produtos após adicionar o produto
      carregarProdutos();
      formAddProduct.style.left = "-450px"; // Fecha o formulário de adição de produto
    }
  };
  xhr.open("POST", "/addProduct", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(produto));
}

// Função para editar um produto (implementação de exemplo)
function editarProduto(id) {
  // Implemente a lógica para obter os dados do produto com o ID fornecido e preencher o formulário de edição
  alert("Implemente a lógica para editar o produto com ID: " + id);
}

// Função para excluir um produto fazendo uma chamada AJAX para o backend
function excluirProduto(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Atualiza a tabela de produtos após excluir o produto
      carregarProdutos();
    }
  };
  xhr.open("GET", "/deleteProduct/" + id, true);
  xhr.send();
}

// Função para carregar os produtos na tabela fazendo uma chamada AJAX para o backend
function carregarProdutos() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Limpa a tabela antes de recarregar os dados
      var tabela = document.getElementById("tabelaProdutos");
      tabela.innerHTML = "";

      // Analisa a resposta do servidor (deve ser um JSON contendo os dados dos produtos)
      var produtos = JSON.parse(xhr.responseText);

      // Itera sobre os produtos e adiciona as linhas à tabela
      produtos.forEach(function (produto) {
        var linha = tabela.insertRow();

        linha.insertCell(0).textContent = produto.idProduto;
        linha.insertCell(1).textContent = produto.nome;
        linha.insertCell(2).textContent = produto.valor;
        linha.insertCell(3).textContent = produto.imagem;
        linha.insertCell(4).textContent = produto.quantidade;

        // Adiciona botões de ação para editar e excluir
        var acoesCelula = linha.insertCell(5);
        acoesCelula.innerHTML = `<button onclick="editarProduto(${produto.idProduto})">Editar</button>
                                 <button onclick="excluirProduto(${produto.idProduto})">Excluir</button>`;
      });
    }
  };
  xhr.open("GET", "/getProducts", true);
  xhr.send();
}

// Chama a função para carregar os produtos quando a página é carregada
document.addEventListener("DOMContentLoaded", function () {
  carregarProdutos();
});
