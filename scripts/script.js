
const quadro1 = document.getElementById('0');
const quadro2 = document.getElementById('1');
const quadro3 = document.getElementById('2');
const quadro4 = document.getElementById('3');
const quadro5 = document.getElementById('4');
const quadro6 = document.getElementById('5');
const quadro7 = document.getElementById('6');
const quadro8 = document.getElementById('7');
const quadro9 = document.getElementById('8');
const jogador = document.getElementById('jogadorAtual');
const vencedor = document.getElementById('vencedor');

var quadros = [quadro1, quadro2, quadro3, quadro4, quadro5, quadro6, quadro7, quadro8, quadro9];

var player = "X";

function escolherQuadro(i){
    console.log(i);
    quadros[i].classList.add('marcado');
    quadros[i].innerHTML = player;
    verificarPlacar(i);
    mudarJogador();
}

function limparQuadro(quadro){
    quadro.classList.remove('marcado');
    quadro.classList.remove('venceu');
    quadro.innerHTML = '.';
}

function mudarJogador() {
    if (player === "X"){
        player = "O";
    } else {
        player = "X";
    }
    jogador.innerHTML = 'Jogador atual: ' + player;
}

function verificarPlacar(i) {
    for(let i = 0; i < 3; i++){
        if(quadros[i].innerHTML == 'X' && quadros[i + 3].innerHTML == "X" && quadros[i + 6].innerHTML == "X" || 
        quadros[i].innerHTML == 'O' && quadros[i + 3].innerHTML == "O" && quadros[i + 6].innerHTML == "O"){
            quadros[i].classList.add('venceu');
            quadros[i + 3].classList.add('venceu');
            quadros[i + 6].classList.add('venceu');
            endGame();
        }
    }
    for(let i = 0; i < 7; i+=3){
        if(quadros[i].innerHTML == 'X' && quadros[i + 1].innerHTML == "X" && quadros[i + 2].innerHTML == "X" || 
        quadros[i].innerHTML == 'O' && quadros[i + 1].innerHTML == "O" && quadros[i + 2].innerHTML == "O"){
            quadros[i].classList.add('venceu');
            quadros[i + 1].classList.add('venceu');
            quadros[i + 2].classList.add('venceu');
            endGame();
        }
    }
    if(quadros[0].innerHTML == 'X' && quadros[4].innerHTML == "X" && quadros[8].innerHTML == "X" || 
    quadros[0].innerHTML == 'O' && quadros[4].innerHTML == "O" && quadros[8].innerHTML == "O"){
        quadros[0].classList.add('venceu');
        quadros[4].classList.add('venceu');
        quadros[8].classList.add('venceu');
        endGame();
    }
    if(quadros[2].innerHTML == 'X' && quadros[4].innerHTML == "X" && quadros[6].innerHTML == "X" || 
    quadros[2].innerHTML == 'O' && quadros[4].innerHTML == "O" && quadros[6].innerHTML == "O"){
        quadros[2].classList.add('venceu');
        quadros[4].classList.add('venceu');
        quadros[6].classList.add('venceu');
        endGame();
    }
}

function endGame(){
    vencedor.innerHTML += player;
}

function restart(){
    for(let i = 0; i < quadros.length; i++){
        limparQuadro(quadros[i]);
        vencedor.innerHTML = 'Vencedor: '
    }
}
