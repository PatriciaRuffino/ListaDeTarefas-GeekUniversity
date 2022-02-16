// referenciar o input

let input = document.querySelector("input[name=tarefas]");

//referencia o button
let btn = document.querySelector("#botao");

//referenciar a lis
let lista = document.querySelector("#lista");

//referenciar o card
let card = document.querySelector(".card");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
//let tarefas = ['correr']

function renderizarTarefas() {
  //limpar a listagem de itens antes de renderizar novamente a tela
  lista.innerHTML = "";
  for (tarefa of tarefas) {
    //criar o item da lista
    let itemLista = document.createElement("li");

    //adicionar a classes no item da lista
    itemLista.setAttribute("class", "list-group-item list-group-item-action");

    //adicionar evento de click no item da lista
    itemLista.onclick = function () {
      deletarTarefa(this);
    };

    //criar um texto
    let itemTexto = document.createTextNode(tarefa);

    //adicionar o texto na lista
    itemLista.appendChild(itemTexto);

    //adicionar o item da lista na lista
    lista.appendChild(itemLista);
  }
}
renderizarTarefas();

//Precisamos escutar o evento de click do botão
btn.onclick = function () {
  //precisamos capturar o valor digitado pelo usuário no input
  let novaTarefa = input.value;
  if (novaTarefa !== "") {
    //precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
    tarefas.push(novaTarefa);
    renderizarTarefas();
    //limpar o input
    input.value = "";
    removerSpans();
    //execuatndo a fenção redenrizar tela
    //salva vos novos dados no banco de dados
    salvarDadosNoStorage();
  } else {
    //gera apenas um span de erro
    removerSpans();

    let span = document.createElement("span");
    span.setAttribute("class", "alert alert-warning");

    let msg = document.createTextNode("Você precisa adicionar uma tarefa!");

    span.appendChild(msg);
    card.appendChild(span);
  }
};
function removerSpans() {
  //buscando todos os spans
  let spans = document.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    card.removeChild(spans[i]);
  }
}
function deletarTarefa(tar) {
  //remover a tarefa do array
  tarefas.splice(tarefas.indexOf(tar.textContent), 1);

  //renderizar novamente a tela
  renderizarTarefas();
  //salva vos novos dados no banco de dados
  salvarDadosNoStorage();
}
function salvarDadosNoStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
