// Seleciona os elementos do formulário de login e registro, bem como o botão de transição de cores
var formSignin = document.querySelector("#signin");
var formSignup = document.querySelector("#signup");
var btnColor = document.querySelector(".btnColor");

// Adiciona um ouvinte de eventos para o botão de login, alterando a posição dos formulários e do botão
document.querySelector("#btnSignin").addEventListener("click", () => {
  formSignin.style.left = "25px";
  formSignup.style.left = "450px";
  btnColor.style.left = "0px";
});

// Adiciona um ouvinte de eventos para o botão de registro, alterando a posição dos formulários e do botão
document.querySelector("#btnSignup").addEventListener("click", () => {
  formSignin.style.left = "-450px";
  formSignup.style.left = "25px";
  btnColor.style.left = "110px";
});

// Seleciona os elementos do formulário de registro e o campo de e-mail
var signupForm = document.querySelector("#signup");
var signupEmailInput = document.querySelector("#email");

// Adiciona um ouvinte de eventos para o envio do formulário de registro
signupForm.addEventListener("submit", function (event) {
  // Chama a função para verificar se o e-mail já está cadastrado
  isEmailAlreadyRegistered(signupEmailInput.value, function (isRegistered) {
    if (isRegistered) {
      // Exibe um alerta se o e-mail já estiver cadastrado e impede o envio do formulário
      alert("Este e-mail já está cadastrado. Por favor, escolha outro.");
      event.preventDefault();
    }
  });
});

// Função para verificar se o e-mail já está cadastrado no backend
function isEmailAlreadyRegistered(email, callback) {
  // Faz uma chamada AJAX para o backend
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Analisa a resposta do servidor (deve ser um JSON indicando se o e-mail já está registrado)
      var response = JSON.parse(xhr.responseText);
      callback(response.isRegistered);
    }
  };
  xhr.open("POST", "/checkEmail", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({ email: email }));
}
