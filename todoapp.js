//https://www.youtube.com/watch?v=oGEYs52ZuHY link exemplo

'use strict';

var tRealizadas = 1;
document.getElementById("historico").innerHTML = "HISTORICO " + "<br> Tarefas realizadas: " + (tRealizadas - 1);

//lista de TAREFAS


const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice =${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice =${indice}>
    `;
    document.getElementById('todoList').appendChild(item);

}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTarefas = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));


}

atualizarTarefas();

const inserirItem = (evento) => {

    const tecla = evento.key;
    const texto = evento.target.value;
    const banco = getBanco();

    if (tecla == 'Enter') {
        banco.push({ 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTarefas();
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTarefas();
}

const atualizarItem = (indice) => {

    const banco = getBanco();
    //banco[indice].status = banco[indice].status === '' ? 'checked' : '';


    if (banco[indice].status == '') {
        banco[indice].status = 'checked';
        tRealizadas++;
        document.getElementById("historico").innerHTML = "HISTORICO " + "<br> Tarefas realizadas: " + (tRealizadas - 1);
    } else {
        banco[indice].status = '';

    }
    setBanco(banco);
    atualizarTarefas();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    const indice = evento.target.dataset.indice;
    if (elemento.type == 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type == 'checkbox') {
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);


//RELOGIO
function relogio() {
    var data = new Date();
    var hor = data.getHours();
    var min = data.getMinutes();
    var seg = data.getSeconds();
    if (hor < 10) {
        hor = "0" + hor;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (seg < 10) {
        seg = "0" + seg;
    }
    var horario = hor + ":" + min + ":" + seg;
    document.getElementById("rel").value = horario;

}
var timer = setInterval(relogio, 1000);





