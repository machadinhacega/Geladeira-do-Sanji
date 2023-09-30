// importando a biblioteca uuid para criar ids novas pra cada elemento
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// JSON.'desestringuificar'(localStorage.pegarItem(chave))
const arrayItens = JSON.parse(localStorage.getItem("arrayItens")) || [];

const atualizarLocalStorage = () => {
  // passar o array atualizado para o localStorage
  // localStorage.guardarItem(chave, valor)
  localStorage.setItem("arrayItens", JSON.stringify(arrayItens));
  // recarregar o banco
  location.reload();
}

const today = (new Date()).toISOString().split("T")[0];

let itemIndex = -1


btnAdd.addEventListener("click", () => {
  containerForm.className = "containerForm";
})

btnCancelar.addEventListener("click", () => {
  for (let erro of document.querySelectorAll(".errorMsg")) {
    erro.innerText = ''
  }
  formCadastro.reset()

  if (btnSave.value === 'Atualizar') {
    window.location = '/';
  }
  containerForm.className = "d-none";
  // ele demora mto, tou usando so pra sair da pagina do item
  // window.location = '/';

})

// CREATE
// POST
formCadastro.addEventListener('submit', (event) => {
  event.preventDefault();

  // lendo informações
  const novoItem = {
    // cria um uuid novo
    id: uuidv4(),
    nome: nomeItem.value.trim(),
    img: imgItem.value,
    quantidade: quantItem.value,
    validade: valItem.value,
    tipo: tipoItem.value,
  }

  // validando informações [erros]
  const infos = document.querySelectorAll(".inputItem");
  const erros = document.querySelectorAll(".errorMsg");
  for (let i = 0; i < infos.length; i++) {
    for (let j = 0; j < erros.length; j++) {
      if (infos[i].value == '') {
        erros[i].innerText = '*Campo obrigatório'
      } else {
        erros[i].innerText = ''
      }
    }
  };
  if (novoItem.quantidade <= 0 && novoItem.quantidade != '') {
    quantError.innerText += '*A quantidade deve ser maior que 0'
  };

  if (novoItem.validade < today && novoItem.validade != '') {
    valError.innerText += '*Não coloque coisas vencidas aqui, seu lixo'
  };

  for (let err of erros) {
    if (err.innerText != '') {
      return
    }
  }

  if (itemIndex != -1) {
    arrayItens[itemIndex] = novoItem;
  } else {
    arrayItens.push(novoItem)
  }
  containerForm.className = "d-none";
  console.log(arrayItens)

  // limpando o form
  formCadastro.reset()

  atualizarLocalStorage()

  // volta do endereço inicial
  // window.location = '/';

})



// READ
// GET
arrayItens.forEach((item, index) => {
  const elem = document.createElement("div");
  elem.className = "elem";

  const infoContainer = document.createElement("div")
  const nome = document.createElement("h3");
  nome.innerText = item.nome;
  nome.className = "text-start fs-2 text text-principal my-0";
  // add o id na url
  nome.href = `/?id=${item.id}`;

  const quantidade = document.createElement("h4");
  quantidade.innerText = `${item.quantidade} unidades`;
  quantidade.className = "text-start fs-6 text text-principal my-0 fw-normal";
  const validade = document.createElement("h4");
  validade.innerText = `val: ${item.validade}`;
  validade.className = "text-start fs-6 text text-secondary mt-0 mb-2 fw-normal";
  infoContainer.append(nome, quantidade, validade);
  infoContainer.className = ""


  const tipo = document.createElement("h4");
  tipo.innerText = item.tipo;
  tipo.className = "";

  const img = document.createElement("img");
  img.src = item.img;
  img.className = "imgElemen";

  const link = document.createElement("a")
  link.href = `/?id=${item.id}`;
  link.appendChild(img)


  // EDIT
  const getItem = (id) => {
    if (id) {
      itemIndex = arrayItens.findIndex((it) => it.id === id);

      if (itemIndex == -1) return;

      const item = arrayItens[itemIndex];
      // jogando pro input
      containerForm.className = "containerForm";
      nomeItem.value = item.nome;
      imgItem.value = item.img;
      quantItem.value = item.quantidade;
      valItem.value = item.validade;
      tipoItem.value = item.tipo;

      btnSave.value = 'Atualizar'
    }
  }
  // // Essa parte tenho que rever pq ainda ficou um pouco confuso pra mim
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  getItem(id);





  // Preparando o READ2
  const btnMais = document.createElement("button")
  btnMais.className = "btnMais"
  btnMais.innerText = 'Ver mais'
  btnMais.className = "btn btnCustom me-2"
  // Função READ2
  btnMais.addEventListener("click", () => {
    cardContainer.innerText = ""
    const infoContainer = document.createElement("div")
    const nome = document.createElement("h3");
    nome.innerText = item.nome;
    nome.className = "text-start fs-2 text text-principal my-0";
    const quantidade = document.createElement("h4");
    quantidade.innerText = `${item.quantidade} unidades`;
    quantidade.className = "text-start fs-6 text text-principal my-0 fw-normal";
    const validade = document.createElement("h4");
    validade.innerText = `val: ${item.validade}`;
    validade.className = "text-start fs-6 text text-secondary mt-0 mb-2 fw-normal";
    const tipo = document.createElement("h4");
    tipo.innerText = item.tipo;
    tipo.className = "text-start fs-6 text text-principal my-0 fw-normal";
    infoContainer.append(nome, quantidade, validade);
    infoContainer.className = ""

    
    // DELETE
    // DELETE
    const retirar = document.createElement("div");
    const quant = document.createElement("h3");
    quant.innerText = item.quantidade;
    quant.className = "text-start fs-2 text text-principal my-0";
    const btnRetirar = document.createElement("button");
    btnRetirar.className = "btnMais";
    btnRetirar.innerText = 'Retirar';
    btnRetirar.className = "btn btnCustom me-2";
    btnRetirar.addEventListener("click", () => {
      // DELETE
      if (confirm(`Aqui só tira se for tudo. Vai comer tudo?`)) {
        arrayItens.splice(index, 1);
        atualizarLocalStorage();
      }
    })
    retirar.append(quant, btnRetirar);
    
    const cardItem = document.createElement("div");

    // Fechar READ2
    const btnX = document.createElement("button")
    btnX.innerText = 'X'
    btnX.className = "btn btnCustom"
    btnX.addEventListener("click", () => {
      cardContainer.innerText = ""
    })
    
    // READ2
    cardItem.append(infoContainer, retirar, btnX);
    cardItem.className = "d-flex"
    cardContainer.appendChild(cardItem)
  })

  const btnContainer = document.createElement("div")
  btnContainer.append(btnMais)
  btnContainer.className = "d-flex"
  infoContainer.append(btnContainer)

  // elem.append(infoContainer, img)
  elem.append(infoContainer, link)

  geladeira.appendChild(elem);
  geladeira.className = "d-flex flex-wrap justify-content-center justify-content-lg-between mt-3 mx-lg-5 "




});

// READ 2 (UNIDADE)
// const mostrar = (id) => {
//   for (let item of arrayItens){
//     if (item.id === id ){
//       const infoContainer = document.createElement("div")
//       const nome = document.createElement("h3");
//       nome.innerText = item.nome;
//       nome.className = "text-start fs-2 text text-principal my-0";
//       const quantidade = document.createElement("h4");
//       quantidade.innerText = `${item.quantidade} unidades`;
//       quantidade.className = "text-start fs-6 text text-principal my-0 fw-normal";
//       const validade = document.createElement("h4");
//       validade.innerText = `val: ${item.validade}`;
//       validade.className = "text-start fs-6 text text-secondary mt-0 mb-2 fw-normal";
//       const tipo = document.createElement("h4");
//       tipo.innerText = item.tipo;
//       tipo.className = "text-start fs-6 text text-principal my-0 fw-normal";
//       infoContainer.append(nome, quantidade, validade);
//       infoContainer.className = ""
    
//       const retirar = document.createElement("div");
//       const quant = document.createElement("h3");
//       quant.innerText = item.quantidade;
//       quant.className = "text-start fs-2 text text-principal my-0";
//       const btnRetirar = document.createElement("button");
//       btnRetirar.className = "btnMais";
//       btnRetirar.innerText = 'Retirar';
//       btnRetirar.className = "btn btnCustom me-2";
//       retirar.append(quant, btnRetirar);
      
//       const cardUnitario = document.createElement("div");
//       cardUnitario.append(infoContainer, retirar);

//       cardContainer.append(cardUnitario)
      
//     }
//   }
// }





// CARD
// cardContainer
// const viewItem = (id) => {
//   if (id) {
//     itemIndex = arrayItens.findIndex((it) => it.id === id);

//     if (itemIndex == -1) return;

//     const item = arrayItens[itemIndex];
//     // jogando pro input
//     nomeItem.value = item.nome;
//     imgItem.value = item.img;
//     quantItem.value = item.quantidade;
//     valItem.value = item.validade;
//     tipoItem.value = item.tipo;
//   }
// }



// arrayItens.forEach((item, index) => {

//   const cardItem = document.createElement("div");
//   cardItem.className = "d-flex mt-5 ms-5"

//   const nome = document.createElement("h3");
//   nome.innerText = item.nome;

//   const quant = document.createElement("h4");
//   quant.innerText = item.quantidade;
//   quant.className = "ms-3"

//   cardItem.append(nome, quant);
//   cardContainer.appendChild(cardItem)
// })

// const elem = document.createElement("div");
// elem.className = "elem";
//   elem.append(nome, quantidade, validade, tipo, img, btnDel)


