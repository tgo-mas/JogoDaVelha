/// Coleta de elementos do DOM
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
const placarO = document.getElementById('placarO');
const placarX = document.getElementById('placarX');
const toggle = document.getElementById('slide');

var quadros = [quadro1, quadro2, quadro3, quadro4, quadro5, quadro6, quadro7, quadro8, quadro9];

//// Variáveis para funcionamento do game
var player = "X";
var fim = false;
var contraPC = false;

toggle.addEventListener("click", () => {
  contraPC = true;
  console.log("Acionou");
  if(!fim){
    fim = true;
  }
});

/// escolherQuadro(id) -> Seleciona o quadro escolhido para o player da vez (var player).
function escolherQuadro(i){
    console.log(i);
    if(fim){
        for(let quadro of quadros){
            limparQuadro(quadro);
        }
        fim = false;
    }
    quadros[i].classList.add('marcado');
    quadros[i].innerHTML = player;
    verificarGame();
    mudarJogador();
    if(contraPC && player == 'O'){
      jogadaPc();
      verificarGame();
    }
}

/// limparQuadro(id) -> Limpa o quadro 'id'. Chamado na função restart().
function limparQuadro(quadro){
    quadro.classList.remove('marcado');
    quadro.classList.remove('venceu');
    quadro.innerHTML = '.';
}

/// mudarJogador() -> Muda o jogador da vez (var player).
function mudarJogador() {
    if (player === "X"){
        player = "O";
    } else {
        player = "X";
    }
    jogador.innerHTML = player;
    console.log('trocou');
}

/// verificarGame() -> Verifica o jogo para saber se há vencedor.
function verificarGame() {
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
    let cont = 0;
    for(let quadro of quadros){
        if(quadro.classList.contains('marcado') || quadro.classList.contains('venceu')){
            cont++;
        }
    }
    if(cont == 9){
        fim = true;
    }
}

/// fillJogo() -> Retorna matriz esquematizada do game.
function fillJogo(){
    let jogo = [[1,2,3],
                [4,5,6],
                [7,8,9]];

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            jogo[i][j] = quadros[(j + i*3)].innerHTML;
        }
    }

    return jogo;
}

/// jogadaPc() -> Verifica o jogo e faz uma jogada estratégica (ofensiva ou defensiva). Usado no modo Player vs. PC.
function jogadaPc(){
    let jogou = false;
    let jogo = fillJogo();

    //----------condicionais ofensivas-----------
    if(((jogo[1][0] == 'O' && jogo[2][0] == 'O') || (jogo[0][1] == 'O' && jogo[0][2] == 'O') || (jogo[1][1] == 'O' && jogo[2][2] == 'O')) && (jogo[0][0] == '.')){
      escolherQuadro(0);
      jogou = true; 
    }else if(((jogo[0][0] == 'O' && jogo[0][2] == 'O') || (jogo[1][1] == 'O' && jogo[2][1] == 'O')) && (jogo[0][1] == '.')){
      escolherQuadro(1);
      jogou = true; 
    }else if (((jogo[0][0] == 'O' && jogo[0][1] == 'O') || (jogo[1][2] == 'O' && jogo[2][2] == 'O') || (jogo[1][1] == 'O' && jogo[2][0] == 'O')) && (jogo[0][2] == '.')){
      escolherQuadro(2);
      jogou = true; 
    }else if( ((jogo[0][0] == 'O' && jogo[2][0] == 'O') || (jogo[1][1] == 'O' && jogo[1][2] == 'O')) && (jogo[1][0] == '.')){
      escolherQuadro(3);
      jogou = true; 
    }else if(((jogo[0][0] == 'O' && jogo[2][2] == 'O') || (jogo[0][1] == 'O' && jogo[2][1] == 'O') || (jogo[1][0] == 'O' && jogo[1][2] == 'O') || (jogo[0][1] == 'O' && jogo[2][1] == 'O')) && (jogo[1][1] == '.')){
      escolherQuadro(4);
      jogou = true; 
    }else if( ((jogo[0][2] == 'O' && jogo[2][2] == 'O') || (jogo[1][0] == 'O' && jogo[1][1] == 'O')) && (jogo[1][2] == '.')){
      escolherQuadro(5);
      jogou = true; 
    }else if( ((jogo[0][0] == 'O' && jogo[1][0] == 'O') || (jogo[0][2] == 'O' && jogo[1][1] == 'O') || (jogo[2][1] == 'O' && jogo[2][2] == 'O')) && (jogo[2][0] == '.')){
      escolherQuadro(6);
      jogou = true; 
    }else if( ((jogo[0][1] == 'O' && jogo[1][1] == 'O') || (jogo[2][0] == 'O' && jogo[2][2] == 'O')) && (jogo[2][1] == '.')){
      escolherQuadro(7);
      jogou = true; 
    }else if( ((jogo[0][2] == 'O' && jogo[1][2] == 'O') || (jogo[2][0] == 'O' && jogo[2][1] == 'O') || (jogo[0][0] == 'O' && jogo[1][1] == 'O')) && (jogo[2][2] == '.')){
      escolherQuadro(8);
      jogou = true; 
    }else{       
      //----- condicionais defensivas------
      
      if(((jogo[1][0] == 'X' && jogo[2][0] == 'X') || (jogo[0][1] == 'X' && jogo[0][2] == 'X') || (jogo[1][1] == 'X' && jogo[2][2] == 'X')) && (jogo[0][0] == '.')){
        escolherQuadro(0);
        jogou = true; 
      }else if( ((jogo[0][0] == 'X' && jogo[0][2] == 'X') || (jogo[1][1] == 'X' && jogo[2][1] == 'X')) && (jogo[0][1] == '.')){
        escolherQuadro(1);
        jogou = true; 
      }else if( ((jogo[0][0] == 'X' && jogo[0][1] == 'X') || (jogo[1][2] == 'X' && jogo[2][2] == 'X') || (jogo[1][1] == 'X' && jogo[2][0] == 'X')) && (jogo[0][2] == '.')){
        escolherQuadro(2);
        jogou = true; 
      }else if( ((jogo[0][0] == 'X' && jogo[2][0] == 'X') || (jogo[1][1] == 'X' && jogo[1][2] == 'X')) && (jogo[1][0] == '.')){
        escolherQuadro(3);
        jogou = true; 
      }else if( ((jogo[0][0] == 'X' && jogo[2][2] == 'X') || (jogo[0][1] == 'X' && jogo[2][1] == 'X') || (jogo[1][0] == 'X' && jogo[1][2] == 'X') || (jogo[0][1] == 'X' && jogo[2][1] == 'X')) && (jogo[1][1] == '.')){
        escolherQuadro(4);
        jogou = true; 
      }else if( ((jogo[0][2] == 'X' && jogo[2][2] == 'X') || (jogo[1][0] == 'X' && jogo[1][1] == 'X')) && (jogo[1][2] == '.')){
        escolherQuadro(5);
        jogou = true; 
      }else if( ((jogo[0][0] == 'X' && jogo[1][0] == 'X') || (jogo[0][2] == 'X' && jogo[1][1] == 'X') || (jogo[2][1] == 'X' && jogo[2][2] == 'X')) && (jogo[2][0] == '.')){
        escolherQuadro(6);
        jogou = true; 
      }else if( ((jogo[0][1] == 'X' && jogo[1][1] == 'X') || (jogo[2][0] == 'X' && jogo[2][2] == 'X')) && (jogo[2][1] == '.')){
        escolherQuadro(7);
        jogou = true; 
      }else if( ((jogo[0][2] == 'X' && jogo[1][2] == 'X') || (jogo[2][0] == 'X' && jogo[2][1] == 'X') || (jogo[0][0] == 'X' && jogo[1][1] == 'X')) && (jogo[2][2] == '.')){
        escolherQuadro(8);
        jogou = true; 
      }
    }

    while (!jogou){
      i = Math.floor(Math.random() * 2);
      j = Math.floor(Math.random() * 2);
  
      if(jogo[i][j] != 'X' && jogo[i][j] != 'O'){
        escolherQuadro((j + i*3) + 1);
        jogou = true;  
      }
    }
}

/// endGame() -> Termina o jogo e declara um vencedor (ou velha).
function endGame(){
    switch(player){
        case 'X':
            console.log(placarX.innerHTML);
            plac = parseInt(placarX.innerHTML);
            placarX.innerHTML = (plac + 1);
            break;
        case 'O':
            plac = parseInt(placarO.innerHTML);
            placarO.innerHTML = (plac + 1);
            break;
    }
    fim = true;
}

/// restart() -> Chama limparQuadro(id) para todos os quadros.
function restart(){
    for(let quadro of quadros){
        limparQuadro(quadro);
    }
}
