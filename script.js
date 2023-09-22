arrayItens = [];

const today = (new Date()).toISOString().split("T")[0];
// valItem.min =  today;

// CREATE
formCadastro.addEventListener('submit', (event) => {
  event.preventDefault();

  // lendo informações
  const novoItem = {
    nome: nomeItem.value.trim(),
    img: imgItem.value,
    quantidade: quantItem.value,
    validade: valItem.value,
    tipo: tipoItem.value,
  }

  // validando informações [erros]
  const infos = document.querySelectorAll(".inputItem");
  const erros = document.querySelectorAll(".errorMsg");
  for(let i = 0; i < infos.length; i++){
    for(let j = 0; j < erros.length; j++){
      if(infos[i].value == ''){
        erros[i].innerText = '*Campo obrigatório'
      }else{
        erros[i].innerText = ''
      }
    }
  }
  if(novoItem.quantidade <= 0 && novoItem.quantidade != ''){
    quantError.innerText += '*A quantidade deve ser maior que 0'
  }
  
  if(novoItem.validade < today && novoItem.validade != ''){
    valError.innerText += '*Não coloque coisas vencidas aqui, seu lixo'
  }
  
  for(err of erros){
  if (err.innerText != ''){return}
  }
  
  // for(let info of infos ){
  //   if(info.value == ''){
  //     return
  //   }
  // }



  // erros.find()
  
//   array.find(function(valor[, índice[, array]]) {
//     // código a ser executado no elemento
// }[, thisArg])
  
  
  // console.log(campoVazio)




  
    // for (let campo of document.querySelectorAll(".inputItem")){
    //   for(let erro of document.querySelectorAll(".errorMsg")){
    //    if (campo.value == ''){
    //     console.log(campo)
    //   }
    //   }
    // }

  // if(nomeError == '' & imgError == '')

  // if(novoItem.nome + novoItem.img + novoItem.quantidade + novoItem.validade + novoItem.tipo == ''){
  //   for (let erro of document.querySelectorAll(".errorMsg")) {
  //     erro.innerText = '*Campo obrigaório'
  //   }
  // }
  
// nomeError
// imgError
// quantError
// valError
// tipoError

  
  // *Campo obrigatório




  // adicionando ao array
  arrayItens.push(novoItem)
  console.log(arrayItens)


  // limpando o form
  // formCadastro.reset()
})