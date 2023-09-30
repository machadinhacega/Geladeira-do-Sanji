const URL = "https://crudcrud.com/api/e5fefa3f81fa4cdfb74fb659aac9667e/itens";

// REQUEST FUNCTIONS ///////////////

async function getItensObj() { // --------------------- Função assíncrona
  const response = await fetch(URL); // ---------- espera a requisição e guarda na resposta
  return await response.json(); // --------------- retorna a resposta 'jsificada'
}

async function deleteItem(id) {
  const response = await fetch(URL + `/${id}`, { method: "DELETE" });
  if (response.status === 200) return "Não desperdice nem um pedacinho dessa comida!";
  return "Essa comida vai continuar aqui!"
}

async function addItem(itemObj) {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(itemObj),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

async function getItem(id) {  // ----------------- o id passado é pegue pelo urlParams 
  if (id) {
    const response = await fetch(URL + `/${id}`); // --------- a resposta é a URL + o identificador do item (id)
    const item = await response.json(); // ------------------- sendo assim o item recebe justamente o item (kk to maluca ja)

    containerForm.className = "containerForm";

    // form recebe as infos do meu item especificado
    nomeItem.value = item.nome;
    imgItem.value = item.img;
    quantItem.value = item.quantidade;
    valItem.value = item.validade;
    tipoItem.value = item.tipo;

    btnSave.value = 'Atualizar'
  }
}

async function updateItem(id, itemObj) {
  const resonse = await fetch(URL + `/${id}`, {
    method: "PUT",
    body: JSON.stringify(itemObj),
    headers: { 'Content-Type': 'application/json' }
  });
  return await resonse.json();
}

// DOM MANIPULATIONS FUNCTIONS ///////////////

function createItemElement(item, index) { // ----------- o "index" foi usado na implementação do professor pra acessar as imagens
  // READ
  // GET
  const geladeira = document.querySelector("#geladeira");
  const id = `item-${item._id}`;

  let elem = document.querySelector(`div${id}`); // -------- Procura o container com id igual ao id do item.
  if (elem) return; // ------------------------------------- se esse container existir, não cria de novo, para por aqui.
  elem = document.createElement("div");  // ------------ O container do nosso item
  elem.id = id; // ------------------------------------- O container recebe id igual ao id do item.
  elem.className = "elem mx-lg-5";

  const infoContainer = document.createElement("div"); // -------- • Div com informações textuais
  const nome = document.createElement("h3");
  nome.innerText = item.nome;
  nome.className = "text-start fs-2 text text-principal my-0";
  const quantidade = document.createElement("h4");
  quantidade.innerText = `${item.quantidade} unidades`;
  quantidade.className = "text-start fs-6 text text-principal my-0 fw-normal";
  const validade = document.createElement("h4");
  validade.innerText = `val: ${item.validade}`;
  validade.className = "text-start fs-6 text text-secondary mt-0 mb-2 fw-normal";
  infoContainer.append(nome, quantidade, validade);
  infoContainer.className = ""

  const img = document.createElement("img");  // ---------------- • Imagem do item (LINK)
  img.src = item.img;
  img.className = "imgElemen";
  const link = document.createElement("a") // ------ Link que add o id do item no final do 'href' da página
  link.href = `/?id=${item._id}`; // ---------------- vai servir justamente pra identificar que está 'na pagina' de um item especifico
  link.appendChild(img)

  const btnMais = document.createElement("button");  // --------- • Botão para ver as infos especificas de cada item
  btnMais.innerText = 'Ver mais';
  // [!!!!!!!!!!] REVER AS CLASSES QUE ESSE BOTÃO ESTÁ REALMENTE PUXANDO
  btnMais.className = "btnMais";
  btnMais.className = "btn btnCustom me-2";
  btnMais.addEventListener("click", () => {   // ---------------------- Função para mostrar as infos especificas do item
    // READ 2
    cardContainer.innerText = ""
    const infoContainer = document.createElement("div")  // ---------------- Cria o container das infos especificas do item
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

    infoContainer.append(nome, quantidade, validade); // -------------------------- add as infos
    infoContainer.className = ""

    const retirar = document.createElement("div"); // --------- container com o 'retirar' do item
    const quant = document.createElement("h3");
    quant.innerText = item.quantidade;
    quant.className = "text-start fs-2 text text-principal my-0";
    const btnRetirar = document.createElement("button"); // --------- botão para retirar
    btnRetirar.innerText = 'Retirar';
    // [!!!!!!!!!!] REVER AS CLASSES QUE ESSE BOTÃO ESTÁ REALMENTE PUXANDO
    btnRetirar.className = "btnMais";
    btnRetirar.className = "btn btnCustom me-2";
    btnRetirar.addEventListener("click", () => {
      // DELETE
      // DELETE
      if (confirm(`Aqui só tira se for tudo. Vai comer tudo?`)) {
        elem.remove(); // -------------------------------------------- remove meu container elemen
        cardItem.remove();
        deleteItem(item._id).then((msg) => alert(msg)); // ----------- chama a função assincrona de deleção
      }
    })
    retirar.append(quant, btnRetirar);

    // [!!!!!!!!!!!!!!] TESTAR SE DA PRA TIRAR O CARITEM E ADD TUDO NO CARDCONTAINER
    const cardItem = document.createElement("div");
    const btnX = document.createElement("button") // --------------- botão pra limpar o cardContainer
    btnX.innerText = 'X'
    btnX.className = "btn btnCustom"
    btnX.addEventListener("click", () => {
      cardContainer.innerText = ""
    })
    cardItem.append(infoContainer, retirar, btnX);
    cardItem.className = "d-flex"

    cardContainer.appendChild(cardItem) // ------------------------------ cardContainer   
  })

  // [!!!!!!!!!!!!!!] TESTAR SE REALMENTE PRECISA DE UM CONTAINER PRO BOTÃO VER MAIS
  const btnContainer = document.createElement("div")
  btnContainer.append(btnMais)
  btnContainer.className = "d-flex"
  infoContainer.append(btnContainer)

  elem.append(infoContainer, link) // -------------- Add as Infos e a Imagem ao container Elem  

  geladeira.appendChild(elem);// ------------------- Add o elem no container principal Geladeira 
  geladeira.className = "d-flex flex-wrap justify-content-center justify-content-lg-center mt-3 mx-lg-5 "
};


// mostrando na tela cada item do arrayItens
getItensObj().then((arrayItens) => {
  arrayItens.forEach(createItemElement);
})

const today = (new Date()).toISOString().split("T")[0]; // ------------- pegar a data atual para verificar validade

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getItem(id);


// CREATE
// POST
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

  if (id) {
    updateItem(id, novoItem).then(console.log);
  } else {
    addItem(novoItem).then((data) => console.log(data));
  }
  containerForm.className = "d-none";

  formCadastro.reset() // ------------------ limpa o form

  // atualzia a pagina
  window.location = '/';

});



// Abrir o ADD
btnAdd.addEventListener("click", () => {
  containerForm.className = "containerForm"; // ------------  mostra o form
})

//  Fechar o ADD
btnCancelar.addEventListener("click", () => {
  for (let erro of document.querySelectorAll(".errorMsg")) {
    erro.innerText = ''; // -------------------------------- limpa os erros
  }
  formCadastro.reset();  // -------------------------------- limpa os campos
  if (btnSave.value === 'Atualizar') {
    window.location = '/';  // ----------------------------- se estiver editando, volta pra URL sem o id (inicial)
  }
  containerForm.className = "d-none";  // ----------------- esconde o form
});