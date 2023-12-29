var formSignin = document.querySelector("#signin");
var formSignup = document.querySelector("#signup");
var btnColor = document.querySelector(".btnColor");

document.querySelector("#btnSignin").addEventListener("click", () => {
  formSignin.style.left = "25px";
  formSignup.style.left = "450px";
  btnColor.style.left = "0px";
});

document.querySelector("#btnSignup").addEventListener("click", () => {
  formSignin.style.left = "-450px";
  formSignup.style.left = "25px";
  btnColor.style.left = "110px";
});

var signupForm = document.querySelector("#signup");
var signupEmailInput = document.querySelector("#email");

signupForm.addEventListener("submit", function (event) {
  isEmailAlreadyRegistered(signupEmailInput.value, function (isRegistered) {
    if (isRegistered) {
      alert("Este e-mail já está cadastrado. Por favor, escolha outro.");
      event.preventDefault(); // Impede o envio do formulário se o e-mail já estiver cadastrado
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
