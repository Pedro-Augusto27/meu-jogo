// Pega o elemento canva do HTML com id "meuJogo".
const canvas = document.getElementById('meuJogo');

// ctx = Contexto, é o que usamos para desenhar no canvas e o tipo de contexto.
const ctx = canvas.getContext('2d'); // 2d é o tipo de contexto para que possa desenhar.


// PARTES DO JOGADOR:
// Cria o objeto jogador
const jogador = {
    x: 50,  // Posição horizontal inicial
    y: 50,  // Posição vertical inicial

    // Tamanho do jogador
    largura: 40,
    altura: 40,

    cor: 'red'// Cor dele
};

// Desenha o jogador
function desenharJogador() {
    // Função de desenhar o jogador
    ctx.fillStyle = jogador.cor;
    ctx.fillRect(jogador.x, jogador.y, jogador.largura, jogador.altura);
}

// Chama essa função para ele aparacer na tela.
desenharJogador();

// Const para o navegador saber que as teclas estão sendo pressionados
const teclasPressionadas = {}
// Quando apertar a tecla
window.addEventListener('keydown', (e) => {
    teclasPressionadas[e.key] = true;
});

// Quando soltar a tecla
window.addEventListener('keyup', (e) => {
    teclasPressionadas[e.key] = false;
});

// Movimetação do jogador
const velocidade = 5; // Quantas pixels o jogador anda por frame

function moverJogador() {
    if (teclasPressionadas['ArrowUp'] && jogador.y > 0) {
        jogador.y -= velocidade; // Move para cima 
    }
    if (teclasPressionadas['ArrowDown'] && jogador.y < canvas.height - jogador.altura) {
        jogador.y += velocidade; // Move para baixo
    } 
    if (teclasPressionadas['ArrowLeft'] && jogador.x > 0) {
        jogador.x -= velocidade; // Move para esquerda
    }
    if (teclasPressionadas['ArrowRight'] && jogador.x < canvas.width - jogador.largura) {
        jogador.x += velocidade; // Move para direita
    }
}


// PARTES DO INIMIGO:
// Criar objeto inimigo








/** 
 * Função para atualizar o jogo, onde faz com o navegador redesenhe a tela
 * muitas vezes por segundo. 
 * 
 * Ele limpa a tela, atualiza a posição do jogador e desenha novamente.
 * 
 * Essa função gerencia tudo o que acontece no jogo.
*/
function atualizar() {
    // 1. Limpa o canvas inteiro (da posição 0, 0 até o fim)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Atualiza a logica de cada objeto
    moverJogador();


    // 3. Redesenha tudo na tela
    desenharJogador();

    // 4. Repete
    requestAnimationFrame(atualizar);
}

atualizar();