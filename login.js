const data = [
  {userName: 'chopper', password: 'bokuwadoctor'},
  {userName: 'nami', password: 'berry'},
  {userName: 'robin', password: 'poneglyph'},
]

const entrar = document.getElementById("entrar")
entrar.addEventListener("click", () => {
  event.preventDefault()
  
  userError.innerText = ''
  passwordError.innerhtml = ''
  
  let usuarioObj;
  usuarioObj = data.find((usuario => usuario.userName == user.value))
  if (usuarioObj) {
    if (password.value == usuarioObj.password) {
      window.location = '/crud.html'
    } else{
      passwordError.innerText = 'Senha incorreta'
    }
  } else {
    userError.innerText = 'Você não tem acesso à geladeira, seu lixo!'
  }
})

document.querySelector(".verSenha").addEventListener("click", () => {
  if (password.type == "password") {
    password.type = "text"
  } else if (password.type == "text"){
    password.type = "password"
  }
})